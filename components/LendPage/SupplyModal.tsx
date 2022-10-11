import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
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

import { IPool } from "@constants/mockLendingPools";
import { BRAND_COLOR } from "@styles/styleConstants";
import { TabHeading } from "./TabHeading";

type SupplyModalProps = {
  isOpen: any;
  onClose: any;
  pool: IPool | undefined;
};

export const SupplyModal = ({ isOpen, onClose, pool }: SupplyModalProps) => {
  const [tab, setTab] = useState("supply");
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src={pool?.assetImage} boxSize="30px" />
            <VStack alignItems="left" spacing="0" fontWeight="bold">
              <Text fontSize="md">{pool?.symbol}</Text>
              <Text variant="helper">{pool?.assetName}</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <HStack fontWeight="bold">
            <Text variant="helper">Supplied</Text>
            <Spacer />

            <Text>0.00</Text>
            <Text>{pool?.symbol}</Text>
          </HStack>

          <HStack my="1">
            <Text variant="helper">Supply APY</Text>
            <Spacer />

            <Badge colorScheme="green">{pool?.apy}</Badge>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Total withdrawal available</Text>
            <Spacer />

            <Text>363.60M</Text>
            <Text>{pool?.symbol}</Text>
          </HStack>

          <Box
            shadow="xl"
            bgColor={colorMode === "dark" ? "gray.900" : "none"}
            borderRadius="lg"
          >
            <HStack mt="9" mb="6" width="100%">
              <TabHeading
                onClick={() => setTab("supply")}
                tab={tab}
                title="Supply"
                tabId="supply"
              />

              <TabHeading
                onClick={() => setTab("withdraw")}
                tab={tab}
                title="Withdraw"
                tabId="withdraw"
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
                    <Text>{pool?.symbol} </Text>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Image src={pool?.assetImage} boxSize="20px" />
                  </InputLeftElement>
                  <Input
                    type="number"
                    fontSize="sm"
                    variant="filled"
                    _focus={{
                      boxShadow: "none",
                    }}
                    placeholder={
                      tab === "supply"
                        ? "Enter supply amount"
                        : "Enter withdraw amount"
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
                  The floating interest rate is automatically calculated based
                  on market supply and demand.
                </FormHelperText>
              </FormControl>

              <Button width="100%" my="6">
                {tab === "supply" ? "Supply" : "Withdraw"} {pool?.symbol}
              </Button>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
