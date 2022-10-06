import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { IProposal, mockProposals } from "@constants/mockProposals";
import { useEffect, useState } from "react";

const ProposalDetailsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { proposalId } = query;
  const [proposal, setProposal] = useState<IProposal>();

  useEffect(() => {
    if (proposalId) {
      const data = mockProposals.filter(
        (mockProposal) => mockProposal.id.toString() === proposalId
      )[0];
      setProposal(data);
    }
  }, [proposalId]);

  console.log(proposal);

  return (
    <Flex mx="32" flexDir="row">
      {proposalId}
      {proposal?.description?.title}
    </Flex>
  );
};

export default ProposalDetailsPage;
