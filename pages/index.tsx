import type { NextPage } from "next";
import { Flex, Heading, useColorMode } from "@chakra-ui/react";

import { LendStats } from "@components/LendPage/LendStats";
import { LendingPools } from "@components/LendPage/LendingPools";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex mx="32" flexDir="column">
      <LendStats />

      <Heading alignSelf="center" fontSize="lg" mt="9">
        Available lending pools
      </Heading>

      <LendingPools />
    </Flex>
  );
};

export default Home;
