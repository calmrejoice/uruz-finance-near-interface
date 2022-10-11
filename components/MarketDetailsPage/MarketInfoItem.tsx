import { Flex, Text } from "@chakra-ui/react";

export const MarketInfoItem = ({ title, details }: any) => {
  return (
    <Flex flexDir="column" my="3">
      <Text variant="helper">{title}</Text>
      <Text fontWeight="bold" fontSize="sm">
        {details}
      </Text>
    </Flex>
  );
};
