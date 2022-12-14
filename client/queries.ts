import { ethers } from "ethers";
import axios from "axios";

import { address, config } from "@constants/config";
import {
  convertToUnderlyingBalance,
  formatBalance,
  formatDisplayBalance,
} from "@utils/formatBalance";
import { comptrollerAbi, delegatorAbi, jumpRateModelAbi } from "../deployments";
import { generateInterestModelArray } from "./generateInterestModelArray";

import { provider } from "@utils/etherUtils";

export const getUTokenLendStats = async (
  utokenAddress: string,
  collateralDecimals: number
) => {
  if (!utokenAddress) return;

  const contract = new ethers.Contract(utokenAddress, delegatorAbi, provider);
  const totalSupply = await contract.totalSupply();
  const totalBorrow = await contract.totalBorrows();
  const totalReserves = await contract.totalReserves();

  // Exchange rate
  const exchangeRateRaw = await contract.exchangeRateStored();
  const underlyingDecimals = config.erc20TokenDecimals;
  const rateMantissa = 18 + underlyingDecimals - config.utokenDecimals;

  // @ts-ignore
  const oneUTokenInUnderlying = exchangeRateRaw / Math.pow(10, rateMantissa);
  const oneUnderlyingInUToken = 1 / oneUTokenInUnderlying;

  return {
    utokenSupply: formatBalance(totalSupply, config.utokenDecimals),
    utokenBorrowed: formatBalance(totalBorrow, collateralDecimals),
    utokenReserves: formatBalance(totalReserves, collateralDecimals),
    oneToExchangeRate: oneUnderlyingInUToken.toFixed(6),
  };
};

export const getUTokenApy = async (contract: any) => {
  // Supply and Borrow APY
  const mantissa = 10 ** config.erc20TokenDecimals;
  const blocksPerDay = 20 * 60 * 24;
  const daysPerYear = 365;
  const supplyRatePerBlock = await contract.supplyRatePerBlock();
  const borrowRatePerBlock = await contract.borrowRatePerBlock();
  const supplyApy =
    (Math.pow((supplyRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear) -
      1) *
    100;
  const borrowApy =
    (Math.pow((borrowRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear) -
      1) *
    100;

  return { supplyApy, borrowApy };
};

export const getUTokenDetails = async (
  utokenAddress: string,
  collateralDecimals: number
) => {
  if (!utokenAddress) return;
  const contract = new ethers.Contract(utokenAddress, delegatorAbi, provider);

  const totalBorrow = await contract.totalBorrows();

  const totalSupply = await contract.totalSupply();
  const totalReserves = await contract.totalReserves();
  const reserveFactor = await contract.reserveFactorMantissa();
  const totalCash = await contract.getCash();

  const { supplyApy, borrowApy } = await getUTokenApy(contract);

  // Exchange rate
  const exchangeRateRaw = await contract.exchangeRateStored();
  const underlyingDecimals = config.erc20TokenDecimals;
  const rateMantissa = 18 + underlyingDecimals - config.utokenDecimals;

  // @ts-ignore
  const oneUTokenInUnderlying = exchangeRateRaw / Math.pow(10, rateMantissa);
  const oneUnderlyingInUToken = 1 / oneUTokenInUnderlying;

  if (contract) {
    return {
      totalBorrow: formatBalance(totalBorrow, collateralDecimals),
      totalSupply: formatBalance(totalSupply, config.utokenDecimals),
      totalReserves: formatBalance(totalReserves, collateralDecimals),
      reserveFactor: formatBalance(reserveFactor, 18),
      totalCash: formatDisplayBalance(totalCash, collateralDecimals),
      apy: supplyApy.toFixed(2),
      borrowApy: borrowApy.toFixed(2),
      oneToExchangeRate: oneUnderlyingInUToken.toFixed(6),
    };
  }
};

export const getComptrollerDetails = async (utokenAddress: string) => {
  if (!utokenAddress) return;
  const contract = new ethers.Contract(
    address.unitroller,
    comptrollerAbi,
    provider
  );
  const market = await contract.markets(utokenAddress);
  return {
    collateralFactor: formatBalance(market?.collateralFactorMantissa, 18),
  };
};

export const getTokenPrice = async (tokenSymbol: string) => {
  const tokenPriceUrl = `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD`;

  if (tokenSymbol === "URZ") {
    return 0.369;
  } else {
    const { data }: any = await axios.get(tokenPriceUrl);

    return parseFloat(data?.USD);
  }
};

export const getInterestRateModel = async (utokenAddress: string) => {
  if (!utokenAddress) return;
  const utokenContract = new ethers.Contract(
    utokenAddress,
    delegatorAbi,
    provider
  );
  const reserveFactor = await utokenContract.reserveFactorMantissa();
  const cash = await utokenContract.getCash();
  const borrows = await utokenContract.totalBorrows();
  const reserves = await utokenContract.totalReserves();
  const interestAddress = await utokenContract.interestRateModel();

  const interestContract = new ethers.Contract(
    interestAddress,
    jumpRateModelAbi,
    provider
  );
  const mulPerBlock = await interestContract.multiplierPerBlock();
  const basePerBlock = await interestContract.baseRatePerBlock();
  const jumpPerBlock = await interestContract.jumpMultiplierPerBlock();
  const kink = await interestContract.kink();
  const utilizationRate = await interestContract.utilizationRate(
    cash,
    borrows,
    reserves
  );

  const model = generateInterestModelArray(
    mulPerBlock,
    basePerBlock,
    reserveFactor,
    jumpPerBlock,
    kink
  );

  return { model, utilizationRate: formatBalance(utilizationRate, 18) };
};

export const getAccountSnapshot = async (
  utokenAddress: string,
  accountAddress: string,
  tokenSymbol: string,
  collateralFactor: number
) => {
  if (!utokenAddress) return;
  const contract = new ethers.Contract(utokenAddress, delegatorAbi, provider);
  const data = await contract.getAccountSnapshot(accountAddress);
  const utokenBalance = data[1];
  const borrowBalance = data[2];
  const exchangeRateMantissa = data[3];
  const { supplyApy } = await getUTokenApy(contract);

  const tokenPrice = (await getTokenPrice(tokenSymbol)) || 1;

  const underlyingUTokenBalance = convertToUnderlyingBalance(
    exchangeRateMantissa,
    config.erc20TokenDecimals,
    utokenBalance
  );
  const utokenBalanceInUsd = tokenPrice * underlyingUTokenBalance;
  const borrowLimit = utokenBalanceInUsd * collateralFactor;
  const borrowBalanceInUsd =
    formatBalance(borrowBalance, config.erc20TokenDecimals) * tokenPrice;

  return {
    utokenBalance,
    borrowBalance,
    borrowLimit,
    utokenBalanceInUsd,
    borrowBalanceInUsd,
    apy: supplyApy,
  };
};
