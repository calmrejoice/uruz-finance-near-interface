import { Badge, Flex, HStack, Spacer, Text } from "@chakra-ui/react";

import { IProposal } from "@constants/mockProposals";
import { useRouter } from "next/router";

type proposalProps = {
  proposal: IProposal;
};

export const Proposal = ({ proposal }: proposalProps) => {
  const router = useRouter();

  return (
    <Flex
      flexDir="column"
      width="100%"
      borderTop="1px"
      py="3"
      borderColor="gray.300"
      cursor="pointer"
      onClick={() => router.push(`/governance/${proposal.id}`)}
    >
      <HStack>
        <Text fontWeight="semibold" fontSize="sm">
          {proposal.description?.title}
        </Text>
        <Spacer />
        <Text variant="helper"># {proposal.id}</Text>
      </HStack>

      <HStack>
        <Badge colorScheme="green">{proposal.state}</Badge>
        <Spacer />
        <Text variant="helper">
          End at: {proposal.endDate?.toLocaleDateString()}
        </Text>
      </HStack>
    </Flex>
  );
};
