import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

import { IoCartSharp } from "react-icons/io5";
import { TabHeading } from "./TabHeading";
import { IMarket } from "@constants/IMarket";

type BorrowModalProps = {
  isOpen: any;
  onClose: any;
  market: IMarket | undefined;
};

export const BorrowModal = ({ isOpen, onClose, market }: BorrowModalProps) => {
  const [tab, setTab] = useState("borrow");

  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src={market?.assetImage} boxSize="30px" />
            <VStack alignItems="left" spacing="0" fontWeight="bold">
              <Text fontSize="md">{market?.collateralSymbol}</Text>
              <Text variant="helper">{market?.collateralName}</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <HStack fontWeight="bold">
            <Text variant="helper">Borrow limit</Text>
            <Spacer />
            <Text>$0</Text>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Borrow limit used</Text>
            <Spacer />
            <Text>0%</Text>
          </HStack>

          <HStack>
            <Text variant="helper">Borrow APY</Text>
            <Spacer />

            <Badge colorScheme="red">market?.borrowApy</Badge>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Total lending available</Text>
            <Spacer />

            <Text>363.60M</Text>
            <Text>{market?.collateralSymbol}</Text>
          </HStack>

          <Box
            shadow="xl"
            bgColor={colorMode === "dark" ? "gray.900" : "none"}
            borderRadius="lg"
          >
            <HStack mt="9" mb="6" width="100%">
              <TabHeading
                onClick={() => setTab("borrow")}
                tab={tab}
                title="Borrow"
                tabId="borrow"
              />

              <TabHeading
                onClick={() => setTab("repay")}
                tab={tab}
                title="Repay"
                tabId="repay"
              />
            </HStack>

            <Flex mx="6" flexDir="column">
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="sm" mx="0">
                  <HStack spacing="1">
                    <Text variant="helper">Wallet balance</Text>
                    <Spacer />
                    <IconButton
                      variant="ghost"
                      aria-label="Buy token"
                      icon={<IoCartSharp />}
                      size="sm"
                    />
                    <Text display="inline" fontWeight="bold">
                      0.000
                    </Text>
                    <Text>{market?.collateralSymbol} </Text>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Image src={market?.assetImage} boxSize="20px" />
                  </InputLeftElement>
                  <Input
                    type="number"
                    fontSize="sm"
                    variant="filled"
                    _focus={{
                      boxShadow: "none",
                    }}
                    placeholder={
                      tab === "borrow"
                        ? "Enter borrow amount"
                        : "Enter repay amount"
                    }
                  />
                  <InputRightElement>
                    <Text
                      as="button"
                      pr="3"
                      fontSize="sm"
                      textDecor="underline"
                    >
                      Max
                    </Text>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText fontSize="xs">
                  Borrow and repay as you go. Borrowing can be done as long as
                  the collateral value * collateral factor {">"} loan value +
                  accumulated interest.
                </FormHelperText>
              </FormControl>

              <Button width="100%" my="6">
                {tab === "borrow" ? "Borrow" : "Repay"}{" "}
                {market?.collateralSymbol}
              </Button>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
