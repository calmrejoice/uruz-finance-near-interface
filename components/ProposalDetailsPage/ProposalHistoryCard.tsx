import { Text, VStack } from "@chakra-ui/react";

import { Card } from "@components/Shared/Card";
import { IProposalDetails } from "@constants/IProposalDetails";
import { ProposalState } from "./ProposalState";

type ProposalHistoryCardProps = {
  proposal: IProposalDetails | undefined;
  isLoading: boolean;
};

export const ProposalHistoryCard = ({
  proposal,
  isLoading,
}: ProposalHistoryCardProps) => {
  return (
    <Card flexDir="column" flex={1}>
      <Text variant="helper">Proposal History</Text>
      {/* <Text>Ending on {formatDate(proposal?.endDate)}</Text> */}

      <VStack alignItems="flex-start" mt="6">
        <ProposalState title={"Created"} date={proposal?.createdDate} />
        <ProposalState title={"Active"} date={proposal?.startDate} />
        <ProposalState title={"End"} date={proposal?.endDate} />
        <ProposalState title={"Succeed"} date={undefined} />
        <ProposalState title={"Queue"} date={proposal?.queuedDate} />
        <ProposalState title={"Execute"} date={proposal?.executedDate} />
      </VStack>
    </Card>
  );
};
