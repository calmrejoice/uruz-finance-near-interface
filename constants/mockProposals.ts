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
  createdDate: Date | number | undefined;
  executedDate: Date | number | undefined;
  queuedDate: Date | number | undefined;
  startDate: Date | number | undefined;
  endDate: Date | number | undefined;
  cancelDate: Date | number | undefined;

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
    createdDate: new Date(1664129753 * 1000),
    startDate: new Date(1664229753 * 1000),
    endDate: new Date(1664329753 * 1000),
    queuedDate: new Date(1664429753 * 1000),
    executedDate: new Date(1664529753 * 1000),
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
    createdDate: new Date(1665129753 * 1000),
    startDate: new Date(1665229753 * 1000),
    endDate: new Date(1665329753 * 1000),
    queuedDate: new Date(1665429753 * 1000),
    executedDate: new Date(1665529753 * 1000),
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
    createdDate: new Date(1667129753 * 1000),
    startDate: new Date(1667229753 * 1000),
    endDate: new Date(1667329753 * 1000),
    queuedDate: new Date(1667429753 * 1000),
    executedDate: new Date(1667529753 * 1000),
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
