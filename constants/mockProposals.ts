export type ProposalState =
  | "Pending"
  | "Active"
  | "Canceled"
  | "Defeated"
  | "Succeeded"
  | "Queued"
  | "Expired"
  | "Executed";

export interface ProposalAction {
  callData: string;
  signature: string;
  target: string;
  value: string;
}

export interface Description {
  title: string;
  description: string;
  //   forDescription: string;
  //   againstDescription: string;
  //   abstainDescription: string;
}

export interface IProposal {
  againstVotesWei: string;
  createdDate: Date | undefined;
  executedDate: Date | undefined;
  queuedDate: Date | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  cancelDate: Date | undefined;

  description?: Description;
  forVotesWei?: string;
  id: number;
  proposer?: string;
  state?: ProposalState;
  totalVotesWei?: string;
}

export const mockProposals: IProposal[] = [
  {
    id: 1,
    createdDate: new Date("1664922671"),
    queuedDate: new Date("1664922671"),
    startDate: new Date("1664922671"),
    endDate: new Date("1664922671"),
    executedDate: new Date("1664922671"),
    cancelDate: undefined,

    forVotesWei: "886.16K",
    againstVotesWei: "0",

    state: "Executed",
    description: {
      title: "UFP-1 URZ Quarterly Buyback and Funds Allocation",
      description:
        "UFP-1 relates to the Quarterly URUZ Finance URZ Buyback & Funds allocation as indicated in our Tokenomics.",
    },
  },

  {
    id: 2,
    createdDate: new Date("1664922671"),
    queuedDate: new Date("1664922671"),
    startDate: new Date("1664922671"),
    endDate: new Date("1664922671"),
    executedDate: new Date("1664922671"),
    cancelDate: undefined,

    forVotesWei: "886.16K",
    againstVotesWei: "0",

    state: "Executed",
    description: {
      title: "UFP-2 Add USDC as a collateralizable asset",
      description:
        "UFP-2 relates to the Quarterly URUZ Finance URZ Buyback & Funds allocation as indicated in our Tokenomics.",
    },
  },

  {
    id: 3,
    createdDate: new Date("1664922671"),
    queuedDate: new Date("1664922671"),
    startDate: new Date("1664922671"),
    endDate: new Date("1664922671"),
    executedDate: new Date("1664922671"),
    cancelDate: undefined,

    forVotesWei: "886.16K",
    againstVotesWei: "0",

    state: "Executed",
    description: {
      title: "UFP-3 Adjusting the Reserve Factor of TRX Market to 100%",
      description:
        "UFP-3 relates to the Quarterly URUZ Finance URZ Buyback & Funds allocation as indicated in our Tokenomics.",
    },
  },
];
