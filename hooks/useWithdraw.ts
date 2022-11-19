import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";

import { delegatorAbi, wurzAbi } from "@deployments/index";
import { address } from "@constants/config";
import { useToastTransactionStatus } from "./useToastTransactionStatus";
import web3 from "web3";

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

export const useWithdrawGovToken = (withdrawAmount: string | undefined) => {
  const contract = new Contract(address.wurz, wurzAbi);
  const { state, send } = useContractFunction(contract, "withdraw", {
    transactionName: "withdrawGovToken",
    // gasLimitBufferPercentage: 10,
  });
  const { status: statusWithdraw } = state;

  const withdrawAmountWei = withdrawAmount && web3.utils.toWei(withdrawAmount);

  const sendWithdraw = () => send(withdrawAmountWei);

  useToastTransactionStatus(state);

  return { sendWithdraw, statusWithdraw };
};
