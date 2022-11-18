import { config } from "@constants/config";
import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider(config.networkUrl);
