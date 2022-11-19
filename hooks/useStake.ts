import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";

import { wurzAbi } from "@deployments/index";
import { address } from "@constants/config";
import { useToastTransactionStatus } from "./useToastTransactionStatus";
import web3 from "web3";

export const useStake = (stakeAmount: string | undefined) => {
  const contract = new Contract(address.wurz, wurzAbi);
  const { state, send } = useContractFunction(contract, "deposit", {
    transactionName: "depositGovToken",
    // gasLimitBufferPercentage: 10,
  });
  const { status: statusStake } = state;

  const stakeAmountWei = stakeAmount && web3.utils.toWei(stakeAmount);

  const sendStake = () => send(stakeAmountWei);

  useToastTransactionStatus(state);

  return { sendStake, statusStake };
};
