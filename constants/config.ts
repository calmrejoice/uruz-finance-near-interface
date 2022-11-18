export const address = {
  account: "0xDB033CE019a09dFCBc2f96d66Ba8a40a51F14Bc6",
  ethInterestRate: "0x9d3839EF57C38F41EF0895A13F2C0A9b03661A4E",
  unitroller: "0xF2e97e474db0341f234bf4E2530a070CE3ebf57c",
  urz: "0x33b29b61138394b805363A7A2AfA5e782e05733d",
  wurz: "0x1D2351869c62040d086a4663d1e5A564F8489887",
  uurz: "0x42944c1eD32273749f3a2B2E36b6ee26c8CfCE76",
  ueth: "0x093E6b7D12B00e2ED6779036a62E3CBc756a8d15",
  priceOracle: "0xC2F202B044Da3997451b91c51fc1aE3d9E02FAF6",
  priceOracleProxy: "0xAC64C87acd0D17af260A59EE9DCb1b6262025aC0",
  governorAlpha: "0x54aEb66F869E87543a9ae8d34BA775DBB1f7D32a",
  timelock: "0x6a1fEbD03f895FbA1380f60089734c686C1c40Dd",
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
      collateralName: "URUZ",
      collateralDecimals: 18,
      assetImage: "/tokens/urz.png",
    },
    {
      collateralSymbol: "wNEAR",
      utokenAddress: "",
      collateralAddress: "",
      collateralName: "NEAR",
      collateralDecimals: 18,
      assetImage: "/tokens/wnear.png",
    },
  ],
  utokenDecimals: 8,
  networkUrl: "https://testnet.aurora.dev",
};
