import { Flex, Skeleton, Text } from "@chakra-ui/react";

export const MarketInfoItem = ({ title, details, isLoading }: any) => {
  return (
    <Flex flexDir="column" my="3" pr="3">
      <Text variant="helper">{title}</Text>
      {isLoading ? (
        <Skeleton>place</Skeleton>
      ) : (
        <Text fontWeight="bold" fontSize="sm">
          {details}
        </Text>
      )}
    </Flex>
  );
};
