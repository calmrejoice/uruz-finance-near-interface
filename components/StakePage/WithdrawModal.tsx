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
  HStack,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { address, config } from "@constants/config";
import { useApprove, useApprovalStatus } from "@hooks/useApprove";
import { useBalance } from "@hooks/useBalance";
import { useWithdrawGovToken } from "@hooks/useWithdraw";
import { useEthers } from "@usedapp/core";
import { useState } from "react";

export const WithdrawModal = ({ isOpen, onClose, refreshParams }: any) => {
  const { account } = useEthers();

  const { balanceNum, balance } = useBalance(address.wurz, account, false);

  const [isLoading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<any>("");

  const { sendWithdraw } = useWithdrawGovToken(withdrawAmount);

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    setIsLoading(true);
    await sendWithdraw();
    setIsLoading(false);
    onClose();
  };

  const isApproved = useApprovalStatus(address.wurz, account, address.wurz);

  const { sendApprove } = useApprove(address.wurz, address.wurz);

  const handleApprove = async () => {
    setIsLoading(true);
    await sendApprove();
    setIsLoading(false);
  };

  const handleMax = () => {
    setWithdrawAmount(balanceNum);
  };

  const renderButton = () => {
    if (isApproved) {
      return (
        <Button onClick={handleWithdraw} isLoading={isLoading}>
          Withdraw
        </Button>
      );
    } else {
      return (
        <Button onClick={handleApprove} isLoading={isLoading}>
          Approve WURZ
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
            <Text>Withdraw URZ</Text>
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
                placeholder="Enter withdraw amount"
                type="number"
                variant="filled"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
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
