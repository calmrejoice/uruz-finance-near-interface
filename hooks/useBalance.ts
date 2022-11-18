import { useCall, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import { delegatorAbi } from "@deployments/index";

export const useBalance = (
  tokenAddress: string | undefined,
  ownerAddress: string | undefined,
  isEth: boolean
) => {
  const balanceBN = isEth
    ? useEtherBalance(ownerAddress)
    : useTokenBalance(tokenAddress, ownerAddress);

  const balanceNum = balanceBN && formatBalance(balanceBN, 18);
  const balance = balanceBN && formatDisplayBalance(balanceBN, 18);

  return { balanceNum, balance };
};

export const useUTokenBalance = (
  tokenAddress: string | undefined,
  address: string | undefined
) => {
  const { value, error } =
    useCall(
      address &&
        tokenAddress && {
          contract: new Contract(tokenAddress, delegatorAbi),
          method: "balanceOf",
          args: [address],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
  }
  const balanceBN = value?.[0];
  const balanceNum = balanceBN && formatBalance(balanceBN, 8);
  const balance = balanceBN && formatDisplayBalance(balanceBN, 8);

  return { balanceNum, balance };
};
