import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AccountStat } from "@components/PortfolioPage/AccountStat";
import { Card } from "@components/Shared/Card";
import { StakeModal } from "./StakeModal";
import { WithdrawModal } from "./WithdrawModal";

export const StakeCard = () => {
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
      <WithdrawModal isOpen={isOpenWithdraw} onClose={onCloseWithdraw} />
      <StakeModal isOpen={isOpenStake} onClose={onCloseStake} />
      <Flex flexDir="row" alignItems="center">
        <Image
          src="/tokens/urz.png"
          boxSize="30px"
          borderRadius="full"
          mr="3"
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
          <Text fontSize="4xl" fontWeight="bold">
            0 URZ
          </Text>
        </HStack>
      </Flex>
      <Spacer />

      <HStack spacing="9">
        <AccountStat title="URZ Staking APR" value="21.18%" />
        <Divider orientation="vertical" height="3rem" />
        <AccountStat title="Daily Emission" value="3,000 URZ" />
        <Divider orientation="vertical" height="3rem" />
        <AccountStat title="Total Staked" value="5.17M URZ" />
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
