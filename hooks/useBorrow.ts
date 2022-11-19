import { Contract } from "@ethersproject/contracts";
import { Falsy, useCall, useContractFunction } from "@usedapp/core";

import { CEtherAbi, delegatorAbi } from "@deployments/index";
import Web3 from "web3";
import { useToastTransactionStatus } from "./useToastTransactionStatus";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import { config } from "@constants/config";

export const useBorrow = (
  utokenAddress: string | undefined,
  borrowAmount: string | undefined,
  isEth: boolean
) => {
  const borrowAmountWei = borrowAmount && Web3.utils.toWei(borrowAmount);

  const abi = isEth ? CEtherAbi : delegatorAbi;
  const contract = utokenAddress && new Contract(utokenAddress, abi);
  const { state, send } = useContractFunction(contract, "borrow", {
    transactionName: "borrow",
    // gasLimitBufferPercentage: 10,
  });
  const { status: statusBorrow } = state;

  const sendBorrow = () => send(borrowAmountWei);

  useToastTransactionStatus(state);
  return { sendBorrow, statusBorrow };
};

export const useBorrowedBalance = (
  utokenAddress: string | Falsy,
  address: string | Falsy
) => {
  const { value, error } =
    useCall(
      address &&
        utokenAddress && {
          contract: new Contract(utokenAddress, delegatorAbi), // instance of called contract
          method: "borrowBalanceStored", // Method to be called
          args: [address], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
  }
  const balanceBN = value?.[0];
  const balanceNum =
    balanceBN && formatBalance(balanceBN, config.erc20TokenDecimals);
  const balance =
    balanceBN && formatDisplayBalance(balanceBN, config.erc20TokenDecimals);

  return { balanceNum, balance };
};
