import { Flex, Text, useColorMode } from "@chakra-ui/react";

export const Card = ({ children, ...props }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flex="1"
      borderRadius="xl"
      p="9"
      shadow="xl"
      m="6"
      bgColor={colorMode === "dark" ? "gray.900" : "none"}
      {...props}
    >
      {children}
    </Flex>
  );
};
