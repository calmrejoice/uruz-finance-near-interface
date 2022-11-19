import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";
import web3 from "web3";

import { governorAbi, wurzAbi } from "@deployments/index";
import { address } from "@constants/config";
import { useToastTransactionStatus } from "./useToastTransactionStatus";
import { BigNumber, ethers } from "ethers";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";

export const useVotesCasted = (ownerAddress: string | undefined) => {
  const { value, error } =
    useCall(
      ownerAddress && {
        contract: new Contract(address.wurz, wurzAbi),
        method: "lockOf",
        args: [ownerAddress],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
  }
  const votesCastedBN = value?.[0];
  const votesCastedNum = votesCastedBN && formatBalance(votesCastedBN, 18);
  const votesCasted = votesCastedBN && formatDisplayBalance(votesCastedBN, 18);

  return { votesCastedNum, votesCasted };
};

export const useCreateProposal = (reserveFactorPercent: number) => {
  const contract = new Contract(address.governorAlpha, governorAbi);
  const { state, send } = useContractFunction(contract, "propose", {
    transactionName: "create proposal",
  });
  const { status: statusPropose } = state;

  const targets = [address.uurz];
  const values = [0];
  const signatures = ["_setReserveFactor(uint256)"];

  const abi = ethers.utils.defaultAbiCoder;
  const reserveFactorBN = BigNumber.from(reserveFactorPercent).mul(
    BigNumber.from((1e16).toString())
  );
  const encode = abi.encode(["uint256"], [reserveFactorBN]);
  const calldatas = [encode];

  console.log(encode);

  // const decode = await abi.decode(["uint256"], encode);
  // console.log(decode.toString());

  const description = "set uurz reserve factor";

  const sendPropose = () =>
    send(targets, values, signatures, calldatas, description);

  useToastTransactionStatus(state);

  return { sendPropose, statusPropose };
};

export const useVotesCastedOnProposal = (
  ownerAddress: string | undefined,
  proposalId: number | undefined
) => {
  const { value, error } =
    useCall(
      proposalId &&
        ownerAddress && {
          contract: new Contract(address.wurz, wurzAbi),
          method: "lockTo",
          args: [ownerAddress, proposalId],
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
  }
  const votesCastedBN = value?.[0];
  const votesCastedOnProposalNum =
    votesCastedBN && formatBalance(votesCastedBN, 18);
  const votesCastedOnProposal =
    votesCastedBN && formatDisplayBalance(votesCastedBN, 18);

  return { votesCastedOnProposalNum, votesCastedOnProposal };
};

export const useCastVote = (
  proposalId: number | undefined,
  numOfVotes: string | undefined,
  support: boolean
) => {
  const contract = new Contract(address.governorAlpha, governorAbi);
  const { state, send } = useContractFunction(contract, "castVote", {
    transactionName: "castVote",
  });
  const { status: statusCastVote } = state;

  const numOfVotesWei = numOfVotes && web3.utils.toWei(numOfVotes);

  const sendCastVote = () => send(proposalId, numOfVotesWei, support);

  useToastTransactionStatus(state);

  return { sendCastVote, statusCastVote };
};
