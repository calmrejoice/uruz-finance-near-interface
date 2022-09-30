import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { BRAND_HOVER_COLOR } from "@styles/styleConstants";

export const PageLink = ({ routeName, pageName }: any) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Flex flexDir="column" position="relative" alignItems="center">
      <Button
        variant="brandLink"
        onClick={() => router.push({ pathname: routeName })}
      >
        {pageName}
      </Button>

      {routeName === pathname && (
        <Box
          bgColor={BRAND_HOVER_COLOR}
          width="30%"
          height="0.5"
          borderRadius="full"
          position="absolute"
          bottom="0"
        />
      )}
    </Flex>
  );
};
