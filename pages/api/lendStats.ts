import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import { ILendStats } from "@constants/ILendStats";
import { getTokenPrice, getUTokenLendStats } from "client/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { markets } = config;

    let accSupply = 0;
    let accBorrowed = 0;
    let accTreasury = 0;

    for (const market of markets) {
      if (!market.utokenAddress) continue;
      const {
        utokenSupply,
        utokenBorrowed,
        utokenReserves,
        oneToExchangeRate,
      }: any = await getUTokenLendStats(
        market?.utokenAddress,
        market?.collateralDecimals
      );

      const priceUsd = (await getTokenPrice(market?.collateralSymbol)) || 1;

      const totalSuppliedInUnderlying =
        utokenSupply / parseFloat(oneToExchangeRate);
      const totalSupplyInUsd = totalSuppliedInUnderlying * priceUsd;

      const totalBorrowedInUsd = utokenBorrowed * priceUsd;

      accSupply += totalSupplyInUsd;
      accBorrowed += totalBorrowedInUsd;
      accTreasury += utokenReserves;
    }

    const lendStats: ILendStats = {
      totalBorrowed: accBorrowed.toFixed(2),
      totalLiquidity: (accSupply - accBorrowed).toFixed(2),
      totalSupply: accSupply.toFixed(2),
      totalTreasury: accTreasury.toFixed(2),
    };

    res.status(200).json(lendStats);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
