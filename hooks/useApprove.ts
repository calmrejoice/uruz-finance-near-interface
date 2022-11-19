import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useTokenAllowance } from "@usedapp/core";

import { delegatorAbi } from "@deployments/index";
import { config } from "@constants/config";
import { useToastTransactionStatus } from "./useToastTransactionStatus";

export const useApprove = (
  tokenAddress: string | undefined,
  spenderAddress: string | undefined
) => {
  const contract = tokenAddress && new Contract(tokenAddress, delegatorAbi);
  const { state, send } = useContractFunction(contract, "approve", {
    transactionName: "approve",
  });
  const { status: statusApprove } = state;

  const sendApprove = () =>
    send(spenderAddress, config.unlimitedApprovalAmount);

  useToastTransactionStatus(state);

  return { sendApprove, statusApprove };
};

export const useApprovalStatus = (
  tokenAddress: string | undefined,
  ownerAddress: string | undefined,
  spenderAddress: string | undefined
) => {
  const allowanceBN = useTokenAllowance(
    tokenAddress,
    ownerAddress,
    spenderAddress
  );

  const isApproved =
    (allowanceBN && allowanceBN >= config.unlimitedApprovalAmount) || false;

  return isApproved;
};
