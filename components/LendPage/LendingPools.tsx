import { Card } from "@components/Shared/Card";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Image,
  VStack,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";

import { IPool, mockLendingPools } from "constants/mockLendingPools";
import { SupplyModal } from "./SupplyModal";
import { AssetTableRow } from "./AssetTableRow";
import { useMarkets } from "@hooks/swrHooks";

export const LendingPools = () => {
  const { markets } = useMarkets();

  return (
    <Card>
      <TableContainer width="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Total Supply</Th>
              <Th>APY</Th>
              <Th>Total Borrow</Th>
              <Th>Borrow APY</Th>
              <Th>Available Lending</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {markets?.map((market, index) => {
              return <AssetTableRow key={index} market={market} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};
