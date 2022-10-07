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
      <Icon as={BsFillCheckCircleFill} color="green.500" />
      <Text fontSize="sm" fontWeight="medium">
        {title}
      </Text>
      <Spacer />
      <Text variant="helper">{formatDate(date)}</Text>
    </HStack>
  );
};
