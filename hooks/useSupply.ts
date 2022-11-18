import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useSendTransaction } from "@usedapp/core";

import { CEtherAbi, delegatorAbi } from "@deployments/index";
import Web3 from "web3";
import { useToastTransactionStatus } from "./useToastTransactionStatus";

export const useSupply = (
  utokenAddress: string | undefined,
  supplyAmount: string | undefined,
  isEth: boolean
) => {
  const supplyAmountWei = supplyAmount && Web3.utils.toWei(supplyAmount);

  const abi = isEth ? CEtherAbi : delegatorAbi;
  const contract = utokenAddress && new Contract(utokenAddress, abi);
  const { state, send } = useContractFunction(contract, "mint", {
    transactionName: "supply",
    // gasLimitBufferPercentage: 10,
  });
  const { status: statusSupply } = state;

  const sendSupply = isEth
    ? () => send({ value: supplyAmountWei })
    : () => send(supplyAmountWei);

  useToastTransactionStatus(state);
  return { sendSupply, statusSupply };
};
