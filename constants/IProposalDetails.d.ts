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

export interface IProposalDetails {
  againstVotes: number;
  forVotes: number;
  createdDate: Date | number | undefined;
  executedDate: Date | number | undefined;
  queuedDate: Date | number | undefined;
  startDate: Date | number | undefined;
  endDate: Date | number | undefined;
  cancelDate: Date | number | undefined;
  description?: Description;
  id: number;
  proposer?: string;
  state?: ProposalState;
  totalVotesWei?: string;
}
