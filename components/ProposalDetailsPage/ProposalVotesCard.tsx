import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { IProposal } from "@constants/mockProposals";

type ProposalVotesCardProps = {
  proposal: IProposal | undefined;
};

export const ProposalVotesCard = ({ proposal }: ProposalVotesCardProps) => {
  return (
    <Card flex={2}>
      <Flex flexDir="column" alignItems="flex-start" width="100%">
        <Badge># {proposal?.id}</Badge>
        <Heading fontSize="lg" my="6">
          {proposal?.description?.title}
        </Heading>

        <HStack spacing="9" width="100%">
          <Flex flexDir="column" width="100%">
            <HStack>
              <Text variant="helper">For</Text>
              <Spacer />
              <Text fontWeight="semibold" fontSize="sm">
                {proposal?.forVotesWei}
              </Text>
            </HStack>

            <Progress
              colorScheme="yellow"
              borderRadius="full"
              size="xs"
              value={20}
              my="3"
              bgColor="gray.400"
            />

            <Button>For</Button>
          </Flex>
          <Flex flexDir="column" width="100%">
            <HStack>
              <Text variant="helper">Against</Text>
              <Spacer />
              <Text fontWeight="semibold" fontSize="sm">
                {proposal?.againstVotesWei}
              </Text>
            </HStack>

            <Progress
              colorScheme="yellow"
              borderRadius="full"
              size="xs"
              value={20}
              my="3"
              bgColor="gray.400"
            />

            <Button>Against</Button>
          </Flex>
        </HStack>
      </Flex>
    </Card>
  );
};
