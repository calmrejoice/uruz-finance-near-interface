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

import { IPool } from "@constants/mockLendingPools";
import { useRouter } from "next/router";
import { BorrowModal } from "./BorrowModal";
import { SupplyModal } from "./SupplyModal";

type AssetTableRowProps = {
  pool: IPool;
};

export const AssetTableRow = ({ pool }: AssetTableRowProps) => {
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
      query: { tokenSymbol: pool.symbol },
    });
  };

  return (
    <Tr
      _hover={{
        bgColor: colorMode === "light" ? "gray.50" : "gray.800",
        cursor: "pointer",
      }}
    >
      <SupplyModal isOpen={isOpenSupply} onClose={onCloseSupply} pool={pool} />
      <BorrowModal isOpen={isOpenBorrow} onClose={onCloseBorrow} pool={pool} />

      <Td onClick={onClickMarketDetails}>
        <HStack>
          <Image src={pool.assetImage} boxSize="30px" />
          <VStack spacing="0" alignItems="left">
            <Text fontSize="sm" fontWeight="bold">
              {pool.symbol}
            </Text>
            <Text variant="helper">{pool.assetName}</Text>
          </VStack>
        </HStack>
      </Td>

      <Td onClick={onClickMarketDetails} fontWeight="bold">
        {pool.totalSupply}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        <Badge colorScheme="green" fontSize="md">
          {pool.apy}
        </Badge>
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        {pool.totalBorrow}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        <Badge colorScheme="red" fontSize="md">
          {pool.borrowApy}
        </Badge>
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold">
        {pool.availableLending}
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
