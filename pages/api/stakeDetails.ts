import type { NextApiRequest, NextApiResponse } from "next";
import { address, config } from "@constants/config";
import { formatBalance } from "@utils/formatBalance";
import { ethers } from "ethers";
import { wurzAbi } from "@deployments/index";
import { provider } from "@utils/etherUtils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { accountAddress }: any = query;

  try {
    if (!accountAddress) return;
    const contract = new ethers.Contract(address.wurz, wurzAbi, provider);
    const accountStakedRaw = await contract.balanceOf(accountAddress);
    const totalStakedRaw = await contract.totalSupply();

    const result = {
      accountStaked: formatBalance(accountStakedRaw, config.erc20TokenDecimals),
      totalStaked: formatBalance(totalStakedRaw, config.erc20TokenDecimals),
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
