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
} from "@chakra-ui/react";

export const WithdrawModal = ({ isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src="/tokens/urz.png" boxSize="30" />
            <Text>Withdraw URZ</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" my="6">
            <InputGroup>
              <InputLeftElement>
                <Image src="/tokens/urz.png" boxSize="20px" />
              </InputLeftElement>
              <Input placeholder="0.00" type="number" variant="filled" />
              <InputRightElement>
                <Text as="button" pr="3" fontSize="sm" textDecor="underline">
                  Max
                </Text>
              </InputRightElement>
            </InputGroup>
            <HStack my="6">
              <Image src="/tokens/urz.png" boxSize="20px" />
              <Text variant="helper">Available URZ</Text>
              <Spacer />
              <Text fontWeight="bold">0 URZ</Text>
            </HStack>
            <Button>Withdraw</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
