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

export const LendingPools = () => {
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
            {mockLendingPools.map((pool, index) => {
              return <AssetTableRow key={index} pool={pool} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};
