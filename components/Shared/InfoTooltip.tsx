import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { ImInfo } from "react-icons/im";

export const InfoTooltip = ({ label }: any) => {
  return (
    <Tooltip
      label={label}
      bgColor="gray.900"
      p="4"
      borderRadius="xl"
      color="white"
      hasArrow
      shadow="2xl"
      textAlign="center"
      fontSize="sm"
    >
      <Flex ml="2">
        <Icon as={ImInfo} color="gray.400" />
      </Flex>
    </Tooltip>
  );
};
