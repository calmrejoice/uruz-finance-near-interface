import {
  Button,
  Heading,
  HStack,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

import { Card } from "@components/Shared/Card";
import { InfoTooltip } from "@components/Shared/InfoTooltip";
import { Proposal } from "./Proposal";
import { useProposals } from "@hooks/swrHooks";
import { CreateProposalModal } from "./CreateProposalModal";
import { address, config } from "@constants/config";
import { useBalance } from "@hooks/useBalance";
import { useEthers } from "@usedapp/core";

export const ProposalsCard = () => {
  const { account } = useEthers();

  const { proposals } = useProposals();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { balanceNum }: any = useBalance(address.wurz, account, false);

  return (
    <Card flex={2} justifyContent="flex-start" flexDir="column">
      <CreateProposalModal isOpen={isOpen} onClose={onClose} />
      <HStack>
        <Heading fontSize="lg">Proposals</Heading>
        <Spacer />

        <HStack>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<AiOutlinePlus />}
            onClick={onOpen}
            disabled={balanceNum < 100_000_000}
          >
            Create Proposal
          </Button>
          <InfoTooltip label="You need to have 100M available votes to create a proposal" />
        </HStack>
      </HStack>

      <VStack spacing="0" mt="6">
        {proposals?.map((proposal, index) => {
          return <Proposal key={index} proposal={proposal} />;
        })}
      </VStack>
    </Card>
  );
};
