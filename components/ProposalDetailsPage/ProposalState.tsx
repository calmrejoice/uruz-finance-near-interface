import { Flex, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { formatDate } from "@utils/formatDate";
import { BsFillCheckCircleFill } from "react-icons/bs";

type ProposalStateProps = {
  date: Date | number | undefined;
  title: string;
};

export const ProposalState = ({ date, title }: ProposalStateProps) => {
  return (
    <HStack w="100%">
      {title === "End" ? (
        <Icon as={BsFillCheckCircleFill} color="yellow.600" />
      ) : (
        <Icon
          as={BsFillCheckCircleFill}
          color={date ? "green.500" : "gray.300"}
        />
      )}

      <Text fontSize="sm" fontWeight="medium">
        {title}
      </Text>
      <Spacer />
      <Text variant="helper">{formatDate(date)}</Text>
    </HStack>
  );
};
