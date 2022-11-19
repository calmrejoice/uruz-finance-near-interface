import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import { getAccountSnapshot, getComptrollerDetails } from "client/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { accountAddress }: any = query;

  try {
    if (!accountAddress) return;
    const { markets } = config;

    let totalBorrowLimit = 0;
    let totalBorrowBalance = 0;
    let totalSupplyBalance = 0;
    let entered = 0;
    let totalApy = 0;
    let totalDailyEarnings = 0;

    for (const market of markets) {
      if (!market?.utokenAddress) continue;
      const { collateralFactor } = (await getComptrollerDetails(
        market?.utokenAddress
      )) || { collateralFactor: 0 };

      const {
        utokenBalance,
        utokenBalanceInUsd,
        borrowBalanceInUsd,
        borrowLimit,
        apy,
      }: any = await getAccountSnapshot(
        market?.utokenAddress,
        accountAddress,
        market?.collateralSymbol,
        collateralFactor
      );

      // net apy cal
      if (utokenBalance >= 1) {
        totalApy += apy;
        entered += 1;
      }
      const dailyEarnings = ((apy / 100) * utokenBalanceInUsd) / 365;

      totalBorrowLimit += borrowLimit;
      totalSupplyBalance += utokenBalanceInUsd;
      totalBorrowBalance += borrowBalanceInUsd;
      totalDailyEarnings += dailyEarnings;
    }

    const netApy = (totalDailyEarnings * 365) / totalSupplyBalance;

    const result = {
      netApy,
      totalSupplyBalance,
      totalBorrowBalance,
      totalDailyEarnings,
      totalBorrowLimit,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
