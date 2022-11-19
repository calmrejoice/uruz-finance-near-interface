import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";

import { CEtherAbi, delegatorAbi } from "@deployments/index";
import Web3 from "web3";
import { useToastTransactionStatus } from "./useToastTransactionStatus";
import { BigNumber } from "ethers";

export const useRepay = (
  utokenAddress: string | undefined,
  repayAmount: string | undefined,
  address: string | undefined,
  isEth: boolean
) => {
  const repayAmountWei = repayAmount && Web3.utils.toWei(repayAmount);

  const abi = isEth ? CEtherAbi : delegatorAbi;
  const contract = utokenAddress && new Contract(utokenAddress, abi);
  const functionName = isEth ? "repayBorrowBehalf" : "repayBorrow";
  const { state, send } = useContractFunction(contract, functionName, {
    transactionName: "repay",
    // gasLimitBufferPercentage: 10,
  });
  const { status: statusRepay } = state;

  const sendRepay = isEth
    ? () => send(address, { value: repayAmountWei })
    : () => send(repayAmountWei);

  useToastTransactionStatus(state);
  return { sendRepay, statusRepay };
};
