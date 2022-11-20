import { useMemo, useState } from "react";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { IoCartSharp } from "react-icons/io5";
import { Contract } from "@ethersproject/contracts";

import { TabHeading } from "./TabHeading";
import { IMarket } from "@constants/IMarket";
import { IMarketDetails } from "@constants/IMarketDetails";
import {
  useContractFunction,
  useEtherBalance,
  useEthers,
  useTokenAllowance,
  useTokenBalance,
} from "@usedapp/core";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import { delegatorAbi } from "@deployments/index";
import { BigNumber } from "ethers";
import { useApprovalStatus, useApprove } from "@hooks/useApprove";
import { useSupplied, useSupply } from "@hooks/useSupply";
import { config } from "@constants/config";
import { useBalance, useUTokenBalance } from "@hooks/useBalance";
import { useWithdraw } from "@hooks/useWithdraw";

type SupplyModalProps = {
  isOpen: any;
  onClose: any;
  market: IMarket | undefined;
  marketDetails: IMarketDetails | undefined;
};

export const SupplyModal = ({
  isOpen,
  onClose,
  market,
  marketDetails,
}: SupplyModalProps) => {
  const [tab, setTab] = useState("supply");
  const { colorMode } = useColorMode();

  const [isLoading, setIsLoading] = useState(false);

  const [supplyAmount, setSupplyAmount] = useState<any>("");
  const [withdrawAmount, setWithdrawAmount] = useState<any>("");

  const { account } = useEthers();

  const isEth = market?.collateralSymbol === "ETH";

  const { balance, balanceNum } = useBalance(
    market?.collateralAddress,
    account,
    isEth
  );

  const { balance: utokenBalance, balanceNum: utokenBalanceNum } =
    useUTokenBalance(market?.utokenAddress, account);

  const { sendSupply, statusSupply } = useSupply(
    market?.utokenAddress,
    supplyAmount,
    isEth
  );
  const handleSupply = async () => {
    if (!supplyAmount) return;
    setIsLoading(true);
    await sendSupply();

    setIsLoading(false);
  };

  const { sendWithdraw, statusWithdraw } = useWithdraw(
    market?.utokenAddress,
    withdrawAmount
  );

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    setIsLoading(true);
    await sendWithdraw();
    setIsLoading(false);
  };

  const isApproved = useApprovalStatus(
    market?.collateralAddress,
    account,
    market?.utokenAddress
  );

  const { sendApprove, statusApprove } = useApprove(
    market?.collateralAddress,
    market?.utokenAddress
  );

  const handleApprove = async () => {
    setIsLoading(true);
    await sendApprove();
    setIsLoading(false);
  };

  const renderButton = () => {
    if (!isApproved && !isEth) {
      return (
        <Button
          width="100%"
          my="6"
          onClick={handleApprove}
          isLoading={isLoading}
        >
          Approve {market?.collateralSymbol}
        </Button>
      );
    } else {
      return (
        <Button
          width="100%"
          my="6"
          onClick={tab === "supply" ? handleSupply : handleWithdraw}
          isLoading={isLoading}
        >
          {tab === "supply" ? "Supply" : "Withdraw"} {market?.collateralSymbol}
        </Button>
      );
    }
  };

  const handleMaxSupply = () => {
    setSupplyAmount(balanceNum?.toString());
  };

  const handleMaxWithdraw = () => {
    setWithdrawAmount(utokenBalanceNum?.toString());
  };

  const { suppliedDisplay } = useSupplied(market?.utokenAddress, account);

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
            <Text variant="helper">Supplied</Text>
            <Spacer />

            <Text>{suppliedDisplay}</Text>
            <Text>{market?.collateralSymbol}</Text>
          </HStack>

          <HStack my="1">
            <Text variant="helper">Supply APY</Text>
            <Spacer />

            <Badge colorScheme="green">{marketDetails?.apy}</Badge>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Total withdrawal available</Text>
            <Spacer />

            <Text>{marketDetails?.totalCash}</Text>
            <Text>{market?.collateralSymbol}</Text>
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
                      {tab === "supply" ? balance : utokenBalance}
                    </Text>
                    <Text>
                      {tab === "supply"
                        ? market?.collateralSymbol
                        : "u" + market?.collateralSymbol}
                    </Text>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Image src={market?.assetImage} boxSize="20px" />
                  </InputLeftElement>
                  <Input
                    type="number"
                    fontSize="sm"
                    min={0}
                    value={tab === "supply" ? supplyAmount : withdrawAmount}
                    onChange={(e) => {
                      tab === "supply"
                        ? setSupplyAmount(e.target.value)
                        : setWithdrawAmount(e.target.value);
                    }}
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
                      onClick={
                        tab === "supply" ? handleMaxSupply : handleMaxWithdraw
                      }
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
              {renderButton()}
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
