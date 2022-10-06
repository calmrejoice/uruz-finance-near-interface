import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { VotesCard } from "@components/GovernancePage/VotesCard";
import { ProposalsCard } from "@components/GovernancePage/ProposalsCard";

const GovernancePage: NextPage = () => {
  return (
    <Flex mx="32" flexDir="row">
      <ProposalsCard />

      <VotesCard />
    </Flex>
  );
};

export default GovernancePage;
