import { Text, VStack } from "@chakra-ui/react";

import { Card } from "@components/Shared/Card";
import { IProposal } from "@constants/mockProposals";
import { ProposalState } from "./ProposalState";

type ProposalHistoryCardProps = {
  proposal: IProposal | undefined;
};

export const ProposalHistoryCard = ({ proposal }: ProposalHistoryCardProps) => {
  return (
    <Card flexDir="column" flex={1}>
      <Text variant="helper">Proposal History</Text>

      <VStack alignItems="flex-start" mt="6">
        <ProposalState title={"Created"} date={proposal?.createdDate} />
        <ProposalState title={"Active"} date={proposal?.startDate} />
        <ProposalState title={"Succeed"} date={proposal?.endDate} />
        <ProposalState title={"Queue"} date={proposal?.queuedDate} />
        <ProposalState title={"Execute"} date={proposal?.executedDate} />
      </VStack>
    </Card>
  );
};
