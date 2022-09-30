import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { BRAND_COLOR } from "@styles/styleConstants";

export const TabHeading = ({ title, tab, tabId, ...props }: any) => {
  const { colorMode } = useColorMode();
  const selectedTextColor = colorMode === "dark" ? "white" : "black";
  const notSelectedTextColor = colorMode === "dark" ? "gray.600" : "gray.300";

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      position="relative"
      height="60px"
      {...props}
    >
      <Text
        fontWeight="bold"
        color={tab === tabId ? selectedTextColor : notSelectedTextColor}
      >
        {title}
      </Text>
      {tab === tabId && (
        <Box
          width="100%"
          position="absolute"
          bgColor={BRAND_COLOR}
          height="0.5"
          bottom="0"
        />
      )}
    </Flex>
  );
};
