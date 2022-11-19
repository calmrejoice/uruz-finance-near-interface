import { Skeleton, Text, VStack } from "@chakra-ui/react";
import CountUp from "react-countup";

export const LendStat = ({ title, stat, isLoading, ...props }: any) => {
  return (
    <VStack flex={1} borderRight="2px" borderColor="gray.300" {...props}>
      <Text variant="helper">{title}</Text>
      {isLoading ? (
        <Skeleton>placeholder</Skeleton>
      ) : (
        <Text fontSize="xl" fontWeight="bold">
          $
          <CountUp end={stat} duration={2} separator="," decimals={2} />
        </Text>
      )}
    </VStack>
  );
};
