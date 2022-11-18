import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import {
  getComptrollerDetails,
  getInterestRateModel,
  getTokenPrice,
  getUTokenDetails,
} from "client/queries";
import { formatDisplayBalance } from "@utils/formatBalance";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { tokenSymbol }: any = query;

  try {
    if (!tokenSymbol) return;
    const { markets } = config;
    const {
      collateralAddress,
      collateralName,
      collateralSymbol,
      collateralDecimals,
      assetImage,
      utokenAddress,
    } =
      markets.filter(
        (market) =>
          market.collateralSymbol.toUpperCase() === tokenSymbol.toUpperCase()
      )[0] || {};

    const {
      totalBorrow,
      reserveFactor,
      totalReserves,
      totalSupply,
      totalCash,
      apy,
      borrowApy,
      oneToExchangeRate,
    } = (await getUTokenDetails(utokenAddress, collateralDecimals)) || {
      totalSupply: 1,
      oneToExchangeRate: "1",
      totalBorrow: 1,
      borrowApy: "1",
    };

    const { collateralFactor } =
      (await getComptrollerDetails(utokenAddress)) || {};

    const priceUsd = (await getTokenPrice(tokenSymbol)) || 1;

    const totalSuppliedInUnderlying =
      totalSupply / parseFloat(oneToExchangeRate);

    const totalSupplyInUsd = (totalSuppliedInUnderlying * priceUsd).toFixed(2);

    const totalBorrowedInUsd = (totalBorrow * priceUsd).toFixed(2);

    const earnUsdPerDay = (
      (parseFloat(totalBorrowedInUsd) * (parseFloat(borrowApy) / 100)) /
      365
    ).toFixed(2);

    const { model, utilizationRate } =
      (await getInterestRateModel(utokenAddress)) || {};

    const result = {
      utokenAddress,
      collateralSymbol,
      collateralAddress,
      collateralName,
      totalBorrow,
      totalSupply,
      totalReserves,
      reserveFactor,
      totalCash,
      assetImage,
      apy,
      borrowApy,
      collateralFactor,
      oneToExchangeRate,
      totalSupplyInUsd,
      totalBorrowedInUsd,
      earnUsdPerDay,
      priceUsd: formatDisplayBalance(priceUsd, 0),
      model,
      utilizationRate,
      //
      //   borrowPaused: 0,
      //   borrowLimit: "0.000000",
      //   depositHeadcount: 11125,
      //   borrowHeadcount: 527,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
