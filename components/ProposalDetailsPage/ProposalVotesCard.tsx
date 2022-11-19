import { Button, Flex, HStack, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { address, config } from "@constants/config";
import { useBalance } from "@hooks/useBalance";
import { useVotesCastedOnProposal } from "@hooks/useGovernance";
import { useEthers } from "@usedapp/core";
import { formatDisplayBalance, numberWithCommas } from "@utils/formatBalance";

export const ProposalVotesCard = ({ proposalId }: any) => {
  const { account } = useEthers();
  const { balanceNum: wurzBalanceNum } = useBalance(
    address.wurz,
    account,
    false
  );

  const { votesCastedOnProposal } = useVotesCastedOnProposal(
    account,
    proposalId
  );

  return (
    <Card flexDir="column">
      <HStack mb="3">
        <Text variant="helper">My total votes on UFP-{proposalId}</Text>
        <Spacer />
        <Text fontWeight="bold">{votesCastedOnProposal}</Text>
      </HStack>

      <HStack mb="6">
        <Text variant="helper">My total votes remaining</Text>
        <Spacer />
        <Text fontWeight="bold">
          {numberWithCommas(wurzBalanceNum?.toFixed(0)!)}
        </Text>
      </HStack>

      <Tooltip label="Votes can be redeemed after voting period has ended or in the event where the proposal is cancelled.">
        <Button
          w="100%"
          variant="outline"
          fontSize="sm"
          //   onClick={handleExchange}
          isDisabled={true}
        >
          Redeem votes back to URZ
        </Button>
      </Tooltip>
    </Card>
  );
};
