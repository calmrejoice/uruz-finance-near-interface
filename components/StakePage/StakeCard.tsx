import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AccountStat } from "@components/PortfolioPage/AccountStat";
import { Card } from "@components/Shared/Card";
import { useStakeDetails } from "@hooks/swrHooks";
import { useEthers } from "@usedapp/core";
import { numberWithCommas } from "@utils/formatBalance";
import { StakeModal } from "./StakeModal";
import { WithdrawModal } from "./WithdrawModal";

export const StakeCard = () => {
  const { account } = useEthers();
  const { stakeDetails, isLoadingStakeDetails } = useStakeDetails(account);

  const {
    isOpen: isOpenWithdraw,
    onOpen: onOpenWithdraw,
    onClose: onCloseWithdraw,
  } = useDisclosure();

  const {
    isOpen: isOpenStake,
    onOpen: onOpenStake,
    onClose: onCloseStake,
  } = useDisclosure();

  return (
    <Card flexDir="column" width="3xl" minHeight="md">
      <WithdrawModal
        isOpen={isOpenWithdraw}
        onClose={onCloseWithdraw}
        refreshParams={stakeDetails}
      />
      <StakeModal
        isOpen={isOpenStake}
        onClose={onCloseStake}
        refreshParams={stakeDetails}
      />
      <Flex flexDir="row" alignItems="center">
        <Image
          src="/tokens/urz.png"
          boxSize="30px"
          borderRadius="full"
          mr="3"
          alt="urz logo"
        />
        <Heading fontWeight="bold" fontSize="lg">
          URZ
        </Heading>
      </Flex>
      <Spacer />

      <Flex alignItems="flex-start" flexDir="column">
        <Flex flexDir="row" alignItems="center">
          <Text variant="helper">You are staking</Text>
        </Flex>
        <HStack alignItems="center">
          {isLoadingStakeDetails ? (
            <Skeleton>placeholder</Skeleton>
          ) : (
            <Text fontSize="4xl" fontWeight="bold">
              {numberWithCommas(stakeDetails?.accountStaked?.toFixed(0))} URZ
            </Text>
          )}
        </HStack>
      </Flex>
      <Spacer />

      <HStack spacing="9">
        <AccountStat title="URZ Staking APR" value={"coming soon"} />
        <Divider orientation="vertical" height="3rem" />
        <AccountStat title="Daily Emission" value={"coming soon"} />
        <Divider orientation="vertical" height="3rem" />
        <AccountStat
          title="Total Staked"
          value={`${numberWithCommas(
            stakeDetails?.totalStaked?.toFixed(0)
          )} URZ`}
          isLoading={isLoadingStakeDetails}
        />
      </HStack>
      <Spacer />

      <HStack width="100%" spacing="30">
        <Button flex={1} size="lg" fontSize="lg" onClick={() => onOpenStake()}>
          Stake
        </Button>
        <Button
          flex={1}
          variant="outline"
          size="lg"
          onClick={() => onOpenWithdraw()}
        >
          Withdraw
        </Button>
      </HStack>
    </Card>
  );
};
