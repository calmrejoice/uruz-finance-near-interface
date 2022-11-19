import { Flex, Progress, Skeleton, Spacer, Text } from "@chakra-ui/react";
import { InfoTooltip } from "@components/Shared/InfoTooltip";

export const BorrowLimit = ({
  borrowLimit,
  totalBorrowBalance,
  isLoading,
}: any) => {
  const borrowLimitUsed = (totalBorrowBalance / borrowLimit) * 100;

  const safeLimit = (borrowLimit * 0.8).toFixed(2);

  return (
    <Flex flexDir="column">
      <Flex flexDir="row" alignItems="center">
        <Text variant="helper" mr="1">
          Borrow limit used:
        </Text>
        {isLoading ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          <Text fontSize="sm" fontWeight="bold">
            {borrowLimitUsed?.toFixed(2)}%
          </Text>
        )}

        <InfoTooltip label="Percentage of total borrow limit used." />

        <Spacer />
        <Text variant="helper" mr="1">
          Limit:
        </Text>
        {isLoading ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          <Text fontSize="sm" fontWeight="bold">
            ${borrowLimit?.toFixed(2)}
          </Text>
        )}
      </Flex>

      <Progress
        colorScheme="yellow"
        borderRadius="full"
        size="xs"
        value={borrowLimitUsed}
        my="3"
        bgColor="gray.400"
      />

      <Flex flexDir="row" alignItems="center">
        <Spacer />
        <Text variant="helper" mr="1">
          Your safe limit:
        </Text>
        {isLoading ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          <Text fontSize="sm" fontWeight="bold">
            ${safeLimit}
          </Text>
        )}

        <InfoTooltip label="80% of your borrow limit. We consider borrowing above this threshold unsafe." />
      </Flex>
    </Flex>
  );
};
