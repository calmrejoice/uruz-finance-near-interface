export interface IPool {
  assetName: string;
  symbol: string;
  assetImage: string;
  totalSupply: string;
  apy: string;
  totalBorrow: string;
  borrowApy: string;
  availableLending: string;
  tokenPrice: string;
  borrowCap: string;
  borrowerCount: string;
  supplierCount: string;
  totalReserves: string;
  reserveFactor: string;
  collateralFactor: string;
  exchangeRate: string;
  // dailySupplyInterest: string;
  // dailyBorrowInterest: string;
  totalInterestPerDay: string;
  totalDistributed: string;
}

export const mockLendingPools: IPool[] = [
  {
    assetName: "Wrapped Near",
    symbol: "wNEAR",
    assetImage: "/tokens/wnear.png",
    totalSupply: "$29.53M",
    apy: "5.38%",
    totalBorrow: "$8.17M",
    borrowApy: "11.68%",
    availableLending: "356.39M wNEAR",
    tokenPrice: "0.06",
    borrowCap: "unlimited",
    borrowerCount: "525",
    supplierCount: "11038",
    totalReserves: "662,960",
    reserveFactor: "10%",
    collateralFactor: "75%",
    exchangeRate: "1 TRX : 98.19738069 jTRX",
    totalInterestPerDay: "$2,138.62",
    totalDistributed: "48,282,438,586",
  },
  {
    assetName: "Near USD",
    symbol: "USN",
    assetImage: "/tokens/usn.png",
    totalSupply: "$224.52M",
    apy: "9.59%",
    totalBorrow: "$23.53M",
    borrowApy: "6.03%",
    availableLending: "176.31M USN",
    tokenPrice: "1.01",
    borrowCap: "200,000,000",
    borrowerCount: "363",
    supplierCount: "1993",
    totalReserves: "21,427",
    reserveFactor: "5%",
    collateralFactor: "85%",
    exchangeRate: "1 USDD : 99.09257503 uUSDD",
    totalInterestPerDay: "$3,459.97",
    totalDistributed: "25,880,256,555",
  },
  {
    assetName: "Tether USD",
    symbol: "USDT",
    assetImage: "/tokens/usdt.png",
    totalSupply: "$161.55M",
    apy: "2.64%",
    totalBorrow: "$68.44M",
    borrowApy: "2.64%",
    availableLending: "93.71M USDT",
    tokenPrice: "1.02",
    borrowCap: "unlimited",
    borrowerCount: "1369",
    supplierCount: "2598",
    totalReserves: "29,610",
    reserveFactor: "5%",
    collateralFactor: "75%",
    exchangeRate: "1 USDT : 98.50360898 uUSDT",
    totalInterestPerDay: "$6,994.7",
    totalDistributed: "28,006,064,477",
  },
];
