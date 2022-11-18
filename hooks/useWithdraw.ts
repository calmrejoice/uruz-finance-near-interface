import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";

import { delegatorAbi } from "@deployments/index";
import { BigNumber } from "ethers";
import { config } from "@constants/config";
import { useToastTransactionStatus } from "./useToastTransactionStatus";

export const useWithdraw = (
  utokenAddress: string | undefined,
  withdrawAmount: string | undefined
) => {
  const contract = utokenAddress && new Contract(utokenAddress, delegatorAbi);
  const { state, send } = useContractFunction(contract, "redeem", {
    transactionName: "withdraw",
    // gasLimitBufferPercentage: 10,
  });
  const { status: statusWithdraw } = state;

  const withdrawAmountWei =
    withdrawAmount && (parseFloat(withdrawAmount) * 1e8).toFixed();

  const sendWithdraw = () => send(withdrawAmountWei);

  useToastTransactionStatus(state);

  return { sendWithdraw, statusWithdraw };
};
