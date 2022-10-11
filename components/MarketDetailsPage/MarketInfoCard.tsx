import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { IPool, mockLendingPools } from "@constants/mockLendingPools";
import { useRouter } from "next/router";
import { MarketInfoItem } from "./MarketInfoItem";
import { SupplyModal } from "@components/LendPage/SupplyModal";
import { BorrowModal } from "@components/LendPage/BorrowModal";

export const MarketInfoCard = () => {
  const router = useRouter();

  const { query } = router;
  const { tokenSymbol } = query;

  const [pool, setPool] = useState<IPool | undefined>();

  useEffect(() => {
    setPool(mockLendingPools.filter((pool) => pool.symbol === tokenSymbol)[0]);
  }, [tokenSymbol]);

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

  return (
    <Card flexDir="column" flex={1}>
      <SupplyModal isOpen={isOpenSupply} onClose={onCloseSupply} pool={pool} />
      <BorrowModal isOpen={isOpenBorrow} onClose={onCloseBorrow} pool={pool} />
      <HStack spacing="6">
        <HStack>
          <Image src={pool?.assetImage} boxSize="30" />
          <Flex flexDir="column">
            <Text fontWeight="bold">{pool?.symbol}</Text>
            <Text variant="helper">{pool?.assetName}</Text>
          </Flex>
        </HStack>
      </HStack>

      <SimpleGrid columns={2} my="6">
        <MarketInfoItem title="Total Supply" details={pool?.totalSupply} />
        <MarketInfoItem title="Total Borrow" details={pool?.totalBorrow} />
        <MarketInfoItem title="Price" details={pool?.tokenPrice} />
        <MarketInfoItem title="Borrow cap" details={pool?.borrowCap} />
        <MarketInfoItem title="Suppliers" details={pool?.supplierCount} />
        <MarketInfoItem title="Borrowers" details={pool?.borrowerCount} />
        <MarketInfoItem
          title="Available lending"
          details={pool?.availableLending}
        />
        <MarketInfoItem
          title="Total interest / Day"
          details={pool?.totalInterestPerDay}
        />
        <MarketInfoItem title="Reserve amount" details={pool?.totalReserves} />
        <MarketInfoItem title="Reserve factor" details={pool?.reserveFactor} />
        <MarketInfoItem
          title={`u${pool?.symbol} minted`}
          details={pool?.totalDistributed}
        />
        <MarketInfoItem
          title="Collateral factor"
          details={pool?.collateralFactor}
        />
        <MarketInfoItem
          title={`u${pool?.symbol} exchange rate`}
          details={pool?.exchangeRate}
        />
      </SimpleGrid>

      <HStack spacing="6">
        <Button
          width="100%"
          colorScheme="green"
          variant="outline"
          onClick={onOpenSupply}
          fontSize="sm"
        >
          Supply {pool?.apy}
        </Button>
        <Button
          width="100%"
          colorScheme="red"
          variant="outline"
          onClick={onOpenBorrow}
          fontSize="sm"
        >
          Borrow {pool?.borrowApy}
        </Button>
      </HStack>
    </Card>
  );
};
