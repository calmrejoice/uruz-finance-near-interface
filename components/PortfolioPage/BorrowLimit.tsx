import { Flex, Progress, Spacer, Text } from "@chakra-ui/react";
import { InfoTooltip } from "@components/Shared/InfoTooltip";

export const BorrowLimit = () => {
  return (
    <Flex flexDir="column">
      <Flex flexDir="row" alignItems="center">
        <Text variant="helper" mr="1">
          Borrow limit used:
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          $0.00
        </Text>
        <InfoTooltip label="Including minted stablecoin" />

        <Spacer />
        <Text variant="helper" mr="1">
          Limit:
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          $0.00
        </Text>
      </Flex>

      <Progress
        colorScheme="yellow"
        borderRadius="full"
        size="xs"
        value={20}
        my="3"
        bgColor="gray.400"
      />

      <Flex flexDir="row" alignItems="center">
        <Spacer />
        <Text variant="helper" mr="1">
          Your safe limit:
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          $0.00
        </Text>

        <InfoTooltip label="80% of your borrow limit. We consider borrowing above this threshold unsafe." />
      </Flex>
    </Flex>
  );
};
