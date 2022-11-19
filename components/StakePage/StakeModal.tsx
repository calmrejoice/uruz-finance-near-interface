import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
  HStack,
  Image,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { address } from "@constants/config";
import { useApprove, useApprovalStatus } from "@hooks/useApprove";
import { useBalance } from "@hooks/useBalance";
import { useStake } from "@hooks/useStake";
import { useEthers } from "@usedapp/core";
import { useState } from "react";

export const StakeModal = ({ isOpen, onClose, refreshParams }: any) => {
  const { account } = useEthers();

  const { balanceNum, balance } = useBalance(address.urz, account, false);

  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<any>("");
  const toast = useToast();

  const { sendStake } = useStake(stakeAmount);

  const handleStake = async () => {
    if (!stakeAmount) return;
    setIsLoading(true);
    await sendStake();

    setIsLoading(false);
    onClose();
  };

  const isApproved = useApprovalStatus(address.urz, account, address.wurz);

  const { sendApprove } = useApprove(address.urz, address.wurz);
  const handleApprove = async () => {
    setIsLoading(true);
    await sendApprove();
    setIsLoading(false);
  };

  const handleMax = () => {
    setStakeAmount(balanceNum);
  };

  const renderButton = () => {
    if (isApproved) {
      return (
        <Button onClick={handleStake} isLoading={isLoading}>
          Stake
        </Button>
      );
    } else {
      return (
        <Button onClick={handleApprove} isLoading={isLoading}>
          Approve URZ
        </Button>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src="/tokens/urz.png" boxSize="30" alt="urz logo" />
            <Text>Stake URZ</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" my="6">
            <InputGroup>
              <InputLeftElement>
                <Image src="/tokens/urz.png" boxSize="20px" alt="urz logo" />
              </InputLeftElement>
              <Input
                min={0}
                placeholder="Enter stake amount"
                type="number"
                variant="filled"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                onClick={() => {
                  stakeAmount === 0 ? setStakeAmount("") : null;
                }}
              />
              <InputRightElement>
                <Text
                  as="button"
                  pr="3"
                  fontSize="sm"
                  textDecor="underline"
                  onClick={handleMax}
                >
                  Max
                </Text>
              </InputRightElement>
            </InputGroup>
            <HStack my="6">
              <Image src="/tokens/urz.png" boxSize="20px" alt="urz logo" />
              <Text variant="helper">Available URZ</Text>
              <Spacer />
              <Text fontWeight="bold">{balance} URZ</Text>
            </HStack>
            {renderButton()}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
