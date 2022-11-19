import { BigNumber } from "ethers";

export const address = {
  account: "0xDB033CE019a09dFCBc2f96d66Ba8a40a51F14Bc6",
  ethInterestRate: "0x9d3839EF57C38F41EF0895A13F2C0A9b03661A4E",
  unitroller: "0xF2e97e474db0341f234bf4E2530a070CE3ebf57c",
  urz: "0x71431Ea524904AE6824E5cB2D8A950C5713660A9",
  wurz: "0x659c456066734aC9b0da7632f43E005C5bb79Dda",
  uurz: "0xb2519B737388d8F81336629986255C4cffe6cac9",
  near: "0x2bD90C3Bd6FF91771b1c0D07B906E02efb8E0e3b",
  unear: "0x8422A5442DccD4E330Ff92b70E365eE2E2B22078",
  ueth: "0x5214FabaF182583Fd5255AD0d342fAcf0310d422",
  priceOracle: "0xC2F202B044Da3997451b91c51fc1aE3d9E02FAF6",
  priceOracleProxy: "0xdb4D2e78227f2d37D5731f43eFAedEBD734c4641",
  governorAlpha: "0x2835538927f0a6b72dE40B3005c58B821f36C28d",
  timelock: "0xaf7Af925Ae728C50d8c3A6ec300d1067826eBEEb",
};

export const config = {
  markets: [
    {
      collateralSymbol: "ETH",
      utokenAddress: address.ueth,
      //   collateralAddress: "",
      collateralName: "Ethereum",
      collateralDecimals: 18,
      assetImage: "/tokens/eth.png",
    },
    {
      collateralSymbol: "URZ",
      utokenAddress: address.uurz,
      collateralAddress: address.urz,
      collateralName: "Uruz",
      collateralDecimals: 18,
      assetImage: "/tokens/urz.png",
    },
    {
      collateralSymbol: "NEAR",
      utokenAddress: address.unear,
      collateralAddress: address.near,
      collateralName: "Near",
      collateralDecimals: 18,
      assetImage: "/tokens/wnear.png",
    },
  ],
  proposals: [
    {
      id: 1,
      createdDate: 1665432845 * 1000,
      startDate: 1665432845 * 1000,
      endDate: 1668370445 * 1000,
      // queuedDate: 1664429753 * 1000,
      // executedDate: 1664529753 * 1000,
      cancelDate: undefined,

      state: "Active",
      description: {
        title: "UFP-1 Adjusting the Reserve Factor of URZ Market to 75%",
        description: "UFP-1 Adjusting the Reserve Factor of URZ Market to 75%",
      },
    },
    {
      id: 2,
      createdDate: 1668249513 * 1000,
      startDate: 1668249513 * 1000,
      endDate: 1668508713 * 1000,
      // queuedDate: 1664429753 * 1000,
      // executedDate: 1664529753 * 1000,
      cancelDate: undefined,

      state: "Active",
      description: {
        title: "UFP-2 Adjusting the Reserve Factor of URZ Market to 15%",
        description: "UFP-2 Adjusting the Reserve Factor of URZ Market to 15%",
      },
    },
  ],
  utokenDecimals: 8,
  erc20TokenDecimals: 18,
  unlimitedApprovalAmount: BigNumber.from(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ),
  networkUrl: "https://testnet.aurora.dev",
};
