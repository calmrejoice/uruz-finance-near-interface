import { Flex, Text, useColorMode } from "@chakra-ui/react";

export const Card = ({ children }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flex="1"
      borderRadius="xl"
      p="9"
      shadow="xl"
      m="6"
      bgColor={colorMode === "dark" ? "gray.900" : "none"}
    >
      {children}
    </Flex>
  );
};
