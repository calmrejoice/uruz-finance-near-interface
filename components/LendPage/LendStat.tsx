import { Text, VStack } from "@chakra-ui/react";

export const LendStat = ({ title, stat, ...props }: any) => {
  return (
    <VStack flex={1} borderRight="2px" borderColor="gray.300" {...props}>
      <Text variant="helper">{title}</Text>
      <Text fontSize="xl" fontWeight="bold">
        {stat}
      </Text>
    </VStack>
  );
};
