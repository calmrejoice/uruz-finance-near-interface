import { Flex, Skeleton, Text } from "@chakra-ui/react";

export const AccountStat = ({ title, value, isLoading }: any) => {
  return (
    <Flex flexDir="column">
      <Text variant="helper">{title}</Text>
      {isLoading ? (
        <Skeleton>placeholder</Skeleton>
      ) : (
        <Text fontSize="xl" fontWeight="bold">
          {value}
        </Text>
      )}
    </Flex>
  );
};
