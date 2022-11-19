import {
  Flex,
  HStack,
  Image,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  Badge,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { IMarket } from "@constants/IMarket";
import { useMarketDetails } from "@hooks/swrHooks";

import { useRouter } from "next/router";
import { BorrowModal } from "./BorrowModal";
import { SupplyModal } from "./SupplyModal";

type AssetTableRowProps = {
  market: IMarket;
};

export const AssetTableRow = ({ market }: AssetTableRowProps) => {
  const { marketDetails } = useMarketDetails(market?.collateralSymbol);

  // console.log(marketDetails);

  const {
    isOpen: isOpenSupply,
    onClose: onCloseSupply,
    onOpen: onOpenSupply,
  } = useDisclosure();

  const {
    isOpen: isOpenBorrow,
    onClose: onCloseBorrow,
    onOpen: onOpenBorrow,
  } = useDisclosure();

  const router = useRouter();

  const { colorMode } = useColorMode();

  const onClickMarketDetails = () => {
    router.push({
      pathname: "marketDetails",
      query: { tokenSymbol: market.collateralSymbol },
    });
  };

  return (
    <Tr
      _hover={{
        bgColor: colorMode === "light" ? "gray.50" : "gray.800",
        cursor: "pointer",
      }}
    >
      <SupplyModal
        isOpen={isOpenSupply}
        onClose={onCloseSupply}
        market={market}
        marketDetails={marketDetails}
      />
      <BorrowModal
        isOpen={isOpenBorrow}
        onClose={onCloseBorrow}
        market={market}
        marketDetails={marketDetails}
      />

      <Td onClick={onClickMarketDetails}>
        <HStack>
          <Image src={market.assetImage} boxSize="30px" />
          <VStack spacing="0" alignItems="left">
            <Text fontSize="sm" fontWeight="bold">
              {market.collateralSymbol}
            </Text>
            <Text variant="helper">{market.collateralName}</Text>
          </VStack>
        </HStack>
      </Td>

      <Td onClick={onClickMarketDetails} fontWeight="bold">
        ${marketDetails?.totalSupplyInUsd}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        <Badge colorScheme="green" fontSize="md">
          {marketDetails?.apy}%
        </Badge>
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        ${marketDetails?.totalBorrowedInUsd}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        <Badge colorScheme="red" fontSize="md">
          {marketDetails?.borrowApy}%
        </Badge>
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        {marketDetails?.totalCash + " " + market?.collateralSymbol}
      </Td>

      <Td>
        <VStack>
          <Button
            width="100%"
            variant="outline"
            fontSize="sm"
            colorScheme="green"
            onClick={() => onOpenSupply()}
          >
            Supply
          </Button>
          <Button
            width="100%"
            variant="outline"
            fontSize="sm"
            colorScheme="red"
            onClick={() => onOpenBorrow()}
          >
            Borrow
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};
