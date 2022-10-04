import { Flex, Text } from "@chakra-ui/react";

export const AccountStat = ({ title, value }: any) => {
  return (
    <Flex flexDir="column">
      <Text variant="helper">{title}</Text>
      <Text fontSize="xl" fontWeight="bold">
        {value}
      </Text>
    </Flex>
  );
};
