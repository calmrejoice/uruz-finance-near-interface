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
import { IMarketDetails } from "@constants/IMarketDetails";
import { useBorrow, useBorrowedBalance } from "@hooks/useBorrow";
import { useEthers, useTokenAllowance } from "@usedapp/core";
import { useRepay } from "@hooks/useRepay";
import { config } from "@constants/config";
import { useApprove } from "@hooks/useApprove";
import { usePortfolio } from "@hooks/swrHooks";

type BorrowModalProps = {
  isOpen: any;
  onClose: any;
  market: IMarket | undefined;
  marketDetails: IMarketDetails | undefined;
};

export const BorrowModal = ({
  isOpen,
  onClose,
  market,
  marketDetails,
}: BorrowModalProps) => {
  const [tab, setTab] = useState("borrow");

  const { colorMode } = useColorMode();

  const [isLoading, setIsLoading] = useState(false);

  const [borrowAmount, setBorrowAmount] = useState<any>("");
  const [repayAmount, setRepayAmount] = useState<any>("");

  const { account } = useEthers();

  const isEth = market?.collateralSymbol === "ETH";
  const { balance: borrowedBalance, balanceNum: borrowedBalanceNum } =
    useBorrowedBalance(market?.utokenAddress, account);

  const { sendBorrow, statusBorrow } = useBorrow(
    market?.utokenAddress,
    borrowAmount,
    isEth
  );
  const handleBorrow = async () => {
    if (!borrowAmount) return;
    setIsLoading(true);
    await sendBorrow();

    setIsLoading(false);
  };

  const { sendRepay, statusRepay } = useRepay(
    market?.utokenAddress,
    repayAmount,
    account,
    isEth
  );

  const handleRepay = async () => {
    if (!repayAmount) return;
    setIsLoading(true);
    await sendRepay();
    setIsLoading(false);
  };

  // const allowanceBN = useTokenAllowance(
  //   market?.utokenAddress,
  //   account,
  //   market?.utokenAddress
  // );
  // console.log(allowanceBN?.toString());

  // const isApproved =
  //   (allowanceBN && allowanceBN >= config.unlimitedApprovalAmount) || false;

  // const { sendApprove, statusApprove } = useApprove(
  //   market?.utokenAddress,
  //   market?.utokenAddress
  // );

  // const handleApprove = async () => {
  //   setIsLoading(true);
  //   await sendApprove();
  //   setIsLoading(false);
  // };

  const renderButton = () => {
    // if (!isApproved && !isEth) {
    //   return (
    //     <Button
    //       width="100%"
    //       my="6"
    //       onClick={handleApprove}
    //       isLoading={isLoading}
    //     >
    //       Approve {market?.collateralSymbol}
    //     </Button>
    //   );
    // } else {
    // return (
    //   <Button
    //     width="100%"
    //     my="6"
    //     onClick={tab === "borrow" ? handleBorrow : handleRepay}
    //     isLoading={isLoading}
    //   >
    //     {tab === "borrow" ? "Borrow" : "Repay"} {market?.collateralSymbol}
    //   </Button>
    // );
    // }
    return (
      <Button
        width="100%"
        my="6"
        onClick={tab === "borrow" ? handleBorrow : handleRepay}
        isLoading={isLoading}
      >
        {tab === "borrow" ? "Borrow" : "Repay"} {market?.collateralSymbol}
      </Button>
    );
  };

  const handleMaxBorrow = () => {
    setBorrowAmount("1");
  };

  const handleMaxRepay = () => {
    setRepayAmount(borrowedBalanceNum?.toString());
  };

  const { portfolio } = usePortfolio(account);
  const borrowLimitUsed =
    (portfolio?.totalBorrowBalance / portfolio?.totalBorrowLimit) * 100;

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
            <Text variant="helper">Total borrowed in all markets</Text>
            <Spacer />
            <Text>${portfolio?.totalBorrowBalance?.toFixed(2)}</Text>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Borrow limit used</Text>
            <Spacer />
            <Text>{borrowLimitUsed?.toFixed(2)}%</Text>
          </HStack>

          <HStack>
            <Text variant="helper">Borrow APY</Text>
            <Spacer />

            <Badge colorScheme="red">{marketDetails?.borrowApy}</Badge>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Total lending available</Text>
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
                    <Text variant="helper">Borrowed balance</Text>
                    <Spacer />
                    <IconButton
                      variant="ghost"
                      aria-label="Buy token"
                      size="sm"
                    />
                    <Text display="inline" fontWeight="bold">
                      {borrowedBalance}
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
                    min={0}
                    fontSize="sm"
                    variant="filled"
                    value={tab == "borrow" ? borrowAmount : repayAmount}
                    onChange={(e) => {
                      tab === "borrow"
                        ? setBorrowAmount(e.target.value)
                        : setRepayAmount(e.target.value);
                    }}
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
                      onClick={
                        tab === "borrow" ? handleMaxBorrow : handleMaxRepay
                      }
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
              {renderButton()}
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
