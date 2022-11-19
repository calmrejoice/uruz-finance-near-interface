import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  HStack,
  Text,
  Spacer,
  Flex,
  Input,
  VStack,
} from "@chakra-ui/react";
import { address } from "@constants/config";
import { useBalance } from "@hooks/useBalance";
import { useCastVote } from "@hooks/useGovernance";
import { useEthers } from "@usedapp/core";
import { useState } from "react";

export const ProposalVoteModal = ({
  proposalId,
  isOpen,
  onClose,
  voteFor,
}: any) => {
  const { account } = useEthers();

  const [voteAmount, setVoteAmount] = useState<any>("");

  const { balanceNum: wurzBalanceNum } = useBalance(
    address.wurz,
    account,
    false
  );

  const [isLoading, setIsLoading] = useState(false);
  const { sendCastVote } = useCastVote(proposalId, voteAmount, voteFor);
  const handleCastVote = async () => {
    if (!voteAmount) return;
    setIsLoading(true);

    await sendCastVote();

    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Vote {voteFor ? "For" : "Against"} UFP-{proposalId}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            <HStack>
              <Text variant="helper">My votes remaining</Text>
              <Spacer />
              <Text fontSize="sm" fontWeight="bold">
                {wurzBalanceNum}
              </Text>
            </HStack>
            <VStack my="6" alignItems="flex-start">
              <Text variant="helper">Number of votes</Text>
              <Input
                min={0}
                placeholder="Enter vote amount"
                value={voteAmount}
                onChange={(e) => setVoteAmount(e.target.value)}
                fontSize="sm"
                type="number"
              />
            </VStack>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              mr={3}
              onClick={async () => {
                await handleCastVote();
                onClose();
              }}
            >
              Vote
            </Button>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
