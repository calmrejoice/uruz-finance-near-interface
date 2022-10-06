import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Card } from "@components/Shared/Card";
import { InfoTooltip } from "@components/Shared/InfoTooltip";
import { AiOutlinePlus } from "react-icons/ai";

export const VotesCard = () => {
  const router = useRouter();

  return (
    <Card flex={1} flexDir="column" height="100%">
      <HStack alignItems="center">
        <Heading fontSize="lg">My wallet</Heading>
        <InfoTooltip label="All URZ holders can co-govern the platform by voting for proposals with their URZ tokens." />
        <Spacer />
        <Button size="xs" variant="outline" leftIcon={<AiOutlinePlus />}>
          Get URZ
        </Button>
      </HStack>
      <HStack my="6">
        <Text variant="helper">URZ Balance</Text>
        <Spacer />
        <HStack my="6">
          <Image src="/tokens/urz.png" boxSize="20px" />
          <Text fontWeight="bold">0 URZ</Text>
        </HStack>
      </HStack>

      <HStack alignItems="center" mb="6">
        <Heading fontSize="lg">My votes</Heading>
        <InfoTooltip label="Stake URZ to vote. You can vote for your favored proposal and revoke the votes you have casted after the voting ended. Your votes remain can be either revoked or cast on other proposals." />
        <Spacer />
      </HStack>

      <HStack>
        <Text variant="helper">Total votes</Text>
        <Spacer />
        <Text fontWeight="bold">0</Text>
      </HStack>

      <HStack>
        <Text variant="helper">Total votes casted</Text>
        <Spacer />
        <Text fontWeight="bold">0</Text>
      </HStack>

      <HStack mb="6">
        <Text variant="helper">Total votes remaining</Text>
        <Spacer />
        <Text fontWeight="bold">0</Text>
      </HStack>

      <HStack spacing="6">
        <Button w="100%" onClick={() => router.push("/stake")}>
          Stake URZ
        </Button>
        <Button
          w="100%"
          variant="outline"
          fontSize="sm"
          onClick={() => router.push("/stake")}
        >
          Withdraw URZ
        </Button>
      </HStack>
    </Card>
  );
};
