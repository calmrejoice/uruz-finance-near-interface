import { Contract } from "@ethersproject/contracts";
import {
  useCall,
  useContractFunction,
  useSendTransaction,
} from "@usedapp/core";

import { CEtherAbi, delegatorAbi } from "@deployments/index";
import Web3 from "web3";
import { useToastTransactionStatus } from "./useToastTransactionStatus";
import {
  convertToUnderlyingBalance,
  formatBalance,
  formatDisplayBalance,
} from "@utils/formatBalance";
import { config } from "@constants/config";

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

export const useSupplied = (
  utokenAddress: string | undefined,
  ownerAddress: string | undefined
) => {
  const { value, error } =
    useCall(
      ownerAddress &&
        utokenAddress && {
          contract: new Contract(utokenAddress, delegatorAbi),
          method: "getAccountSnapshot",
          args: [ownerAddress],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
  }
  const exchangeRateBN = value?.[3];
  const utokenSupplied = value?.[1];

  const suppliedNum = convertToUnderlyingBalance(
    exchangeRateBN,
    config.erc20TokenDecimals,
    utokenSupplied
  );

  const suppliedDisplay =
    suppliedNum <= 1 ? suppliedNum.toFixed(3) : suppliedNum.toFixed(0);

  return { suppliedDisplay };
};
