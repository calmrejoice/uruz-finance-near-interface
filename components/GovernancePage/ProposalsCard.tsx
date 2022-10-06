import {
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

import { Card } from "@components/Shared/Card";
import { InfoTooltip } from "@components/Shared/InfoTooltip";
import { mockProposals } from "@constants/mockProposals";
import { Proposal } from "./Proposal";

export const ProposalsCard = () => {
  return (
    <Card flex={2} justifyContent="flex-start" flexDir="column">
      <HStack>
        <Heading fontSize="lg">Proposals</Heading>
        <Spacer />

        <HStack>
          <Button variant="outline" size="sm" leftIcon={<AiOutlinePlus />}>
            Create Proposal
          </Button>
          <InfoTooltip label="You need to have 300k voting power to create a proposal" />
        </HStack>
      </HStack>

      <VStack spacing="3" mt="6">
        {mockProposals.map((proposal, index) => {
          return <Proposal key={index} proposal={proposal} />;
        })}
      </VStack>
    </Card>
  );
};
