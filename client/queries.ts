import { config } from "@constants/config";
import {
  convertToUnderlyingBalance,
  formatBalance,
  formatDisplayBalance,
} from "@utils/formatBalance";
import { comptrollerAbi, delegatorAbi } from "../deployments";
import axios from "axios";
import { generateInterestModelArray } from "./generateInterestModelArray";
import { ethers } from "ethers";
import { provider } from "@utils/etherUtils";

// export const getUTokenLendStats = async (
//   utokenAddress: string,
//   collateralDecimals: number,
//   isTrx: boolean
// ) => {
//   const contract = await tronWeb.nile.contract().at(utokenAddress);
//   const totalSupply = await contract.totalSupply().call();
//   const totalBorrow = await contract.totalBorrows().call();
//   const totalReserves = await contract.totalReserves().call();

//   // Exchange rate
//   const exchangeRateRaw = await contract.exchangeRateStored().call();
//   const underlyingDecimals =
//     isTrx || utokenAddress === config.uusdtAddress
//       ? config.trxDecimals
//       : config.trc20TokenDecimals;
//   const rateMantissa = 18 + underlyingDecimals - config.utokenDecimals;

//   // @ts-ignore
//   const oneUTokenInUnderlying = exchangeRateRaw / Math.pow(10, rateMantissa);
//   // console.log("1 utoken can be redeemed for", oneUTokenInUnderlying, "token");
//   const oneUnderlyingInUToken = 1 / oneUTokenInUnderlying;

//   return {
//     utokenSupply: formatBalance(totalSupply, config.utokenDecimals),
//     utokenBorrowed: formatBalance(totalBorrow, collateralDecimals),
//     utokenReserves: formatBalance(totalReserves, collateralDecimals),
//     oneToExchangeRate: oneUnderlyingInUToken.toFixed(6),
//   };
// };

// export const getUTokenApy = async (contract: any) => {
//   // Supply and Borrow APY
//   const mantissa = 10 ** config.trc20TokenDecimals;
//   const blocksPerDay = 20 * 60 * 24;
//   const daysPerYear = 365;
//   const supplyRatePerBlock = await contract.supplyRatePerBlock().call();
//   const borrowRatePerBlock = await contract.borrowRatePerBlock().call();
//   const supplyApy =
//     (Math.pow((supplyRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear) -
//       1) *
//     100;
//   const borrowApy =
//     (Math.pow((borrowRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear) -
//       1) *
//     100;

//   return { supplyApy, borrowApy };
// };

export const getUTokenDetails = async (
  utokenAddress: string,
  collateralDecimals: number,
  isTrx: boolean
) => {
  if (!utokenAddress) return;
  const contract = new ethers.Contract(utokenAddress, delegatorAbi, provider);

  const totalBorrow = await contract.totalBorrows();

  const totalSupply = await contract.totalSupply().call();
  const totalReserves = await contract.totalReserves().call();
  const reserveFactor = await contract.reserveFactorMantissa().call();
  const totalCash = await contract.getCash().call();

  const { supplyApy, borrowApy } = await getUTokenApy(contract);

  // Exchange rate
  const exchangeRateRaw = await contract.exchangeRateStored().call();
  const underlyingDecimals =
    isTrx || utokenAddress === config.uusdtAddress
      ? config.trxDecimals
      : config.trc20TokenDecimals;
  const rateMantissa = 18 + underlyingDecimals - config.utokenDecimals;

  // @ts-ignore
  const oneUTokenInUnderlying = exchangeRateRaw / Math.pow(10, rateMantissa);
  // console.log("1 utoken can be redeemed for", oneUTokenInUnderlying, "token");
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

// export const getTokenApprovalStatus = async (
//   tokenAddress: any,
//   ownerAddress: any,
//   spenderAddress: any
// ) => {
//   const contract = await tronWeb.nile.contract().at(tokenAddress);
//   const approvalAmount = await contract
//     .allowance(ownerAddress, spenderAddress)
//     .call();
//   const isApproved = approvalAmount >= config.unlimitedApprovalAmount || false;

//   return isApproved;
// };

// export const getComptrollerDetails = async (utokenAddress: string) => {
//   try {
//     const contract = await tronWeb.nile.contract(
//       comptroller.abi,
//       config.unitrollerAddress
//     );

//     const data = await contract.markets(utokenAddress).call();

//     const collateralFactorRaw = data?.collateralFactorMantissa;

//     const collateralFactor = collateralFactorRaw?.toString();

//     return {
//       collateralFactor: formatBalance(collateralFactor, 18),
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getTokenPrice = async (tokenSymbol: string) => {
//   try {
//     const { data } = await axios.get(config.tokenPriceUrl);
//     const { USDT, TRX } = data.data || {};
//     if (tokenSymbol === "TRX") {
//       return parseFloat(TRX?.quote.USD.price);
//     } else if (tokenSymbol === "URZ") {
//       return parseFloat("0.369");
//     } else if (tokenSymbol === "USDT") {
//       return parseFloat(USDT?.quote.USD.price);
//     }
//     return 0.01;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getInterestRateModel = async (utokenAddress: string) => {
//   try {
//     const utokenContract = await tronWeb.nile.contract().at(utokenAddress);
//     const reserveFactor = await utokenContract.reserveFactorMantissa().call();
//     const cash = await utokenContract.getCash().call();
//     const borrows = await utokenContract.totalBorrows().call();
//     const reserves = await utokenContract.totalReserves().call();
//     const interestAddress = await utokenContract.interestRateModel().call();

//     const interestContract = await tronWeb.nile.contract().at(interestAddress);
//     const mulPerBlock = await interestContract.multiplierPerBlock().call();
//     const basePerBlock = await interestContract.baseRatePerBlock().call();
//     const jumpPerBlock = await interestContract.jumpMultiplierPerBlock().call();
//     const kink = await interestContract.kink().call();
//     const utilizationRate = await interestContract
//       .utilizationRate(cash, borrows, reserves)
//       .call();

//     const model = generateInterestModelArray(
//       mulPerBlock,
//       basePerBlock,
//       reserveFactor,
//       jumpPerBlock,
//       kink
//     );

//     return { model, utilizationRate: formatBalance(utilizationRate, 18) };
//   } catch (error) {
//     console.log(error, "getInterestRateModel");
//   }
// };

// export const getAccountSnapshot = async (
//   utokenAddress: string,
//   accountAddress: string,
//   tokenSymbol: string,
//   collateralFactor: number
// ) => {
//   const contract = await tronWeb.nile.contract().at(utokenAddress);
//   const data = await contract.getAccountSnapshot(accountAddress).call();
//   const utokenBalance = data[1];
//   const borrowBalance = data[2];
//   const exchangeRateMantissa = data[3];
//   const { supplyApy } = await getUTokenApy(contract);

//   const tokenPrice = (await getTokenPrice(tokenSymbol)) || 1;
//   const decimals =
//     tokenSymbol === "TRX" || tokenSymbol === "USDT"
//       ? config.trxDecimals
//       : config.trc20TokenDecimals;
//   const underlyingUTokenBalance = convertToUnderlyingBalance(
//     exchangeRateMantissa,
//     decimals,
//     utokenBalance
//   );

//   const utokenBalanceInUsd = tokenPrice * underlyingUTokenBalance;

//   const borrowLimit = utokenBalanceInUsd * collateralFactor;

//   const borrowBalanceInUsd =
//     formatBalance(borrowBalance, decimals) * tokenPrice;

//   return {
//     utokenBalance,
//     borrowBalance,
//     borrowLimit,
//     utokenBalanceInUsd,
//     borrowBalanceInUsd,
//     apy: supplyApy,
//   };
// };
