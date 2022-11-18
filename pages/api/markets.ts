import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { markets } = config;
    res.status(200).json(markets);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
