import type { NextPage } from "next";
import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Card } from "@components/Shared/Card";
import { ProposalHistoryCard } from "@components/ProposalDetailsPage/ProposalHistoryCard";
import { ProposalCard } from "@components/ProposalDetailsPage/ProposalCard";
import { useProposals } from "@hooks/swrHooks";
import { ProposalVotesCard } from "@components/ProposalDetailsPage/ProposalVotesCard";

const ProposalDetailsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { proposalId }: any = query;

  const { proposals, isLoadingProposals } = useProposals();
  const proposal = proposals?.filter(
    (prop) => prop.id === parseInt(proposalId)
  )[0];

  return (
    <Flex mx="32" flexDir="column">
      <Flex flexDir="row">
        <ProposalCard
          proposal={proposal}
          isLoadingProposal={isLoadingProposals}
        />
        <ProposalHistoryCard
          proposal={proposal}
          isLoading={isLoadingProposals}
        />
      </Flex>

      <Flex>
        <Card flexDir="column" flex={2}>
          <Heading fontSize="lg" mb="6">
            Description
          </Heading>
          {isLoadingProposals ? (
            <Skeleton>placeholder</Skeleton>
          ) : (
            <Text>{proposal?.description?.description}</Text>
          )}
        </Card>
        <ProposalVotesCard proposalId={proposalId} />
      </Flex>
    </Flex>
  );
};

export default ProposalDetailsPage;
