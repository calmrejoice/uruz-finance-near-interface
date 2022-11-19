import {
  Badge,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { IProposalDetails } from "@constants/IProposalDetails";
import { formatDate } from "@utils/formatDate";
import { format } from "date-fns";
import { useRouter } from "next/router";

type proposalProps = {
  proposal: IProposalDetails;
};

export const Proposal = ({ proposal }: proposalProps) => {
  const router = useRouter();

  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir="column"
      width="100%"
      borderTop="1px"
      p="6"
      borderColor="gray.300"
      cursor="pointer"
      onClick={() => router.push(`/governance/${proposal?.id}`)}
      _hover={{
        bgColor: colorMode === "light" ? "gray.50" : "gray.800",
        cursor: "pointer",
      }}
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
        <Text variant="helper">Ends at: {formatDate(proposal?.endDate)}</Text>
      </HStack>
    </Flex>
  );
};
