import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { StakeCard } from "@components/StakePage/StakeCard";

const StakePage: NextPage = () => {
  return (
    <Flex flexDir="column" alignItems="center">
      <StakeCard />
    </Flex>
  );
};

export default StakePage;
