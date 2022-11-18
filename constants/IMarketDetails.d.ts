import { BigNumber } from "ethers";

export interface IMarketDetails {
  utokenAddress: string;
  collateralSymbol: string;
  collateralAddress: string;
  collateralName: string;
  collateralFactor: number;
  assetImage: string;
  totalBorrow: number;
  totalSupply: number;
  totalReserves: number;
  reserveFactor: number;
  totalCash: number;
  apy: number;
  borrowApy: number;
  oneToExchangeRate: number;
  totalSupplyInUsd: number;
  totalBorrowedInUsd: number;
  earnUsdPerDay: number;
  priceUsd: number;
  model: Array;
  utilizationRate: number;
}
