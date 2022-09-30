import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/router";

import { UruzLogo } from "./UruzLogo";
import { PageLink } from "./PageLink";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Flex flexDir="row" mx="9" my="9">
      <UruzLogo />
      <Spacer />
      <HStack>
        <PageLink routeName="/" pageName="Lend" />
        <PageLink routeName="/portfolio" pageName="Portfolio" />
        <PageLink routeName="/governance" pageName="Governance" />
        <PageLink routeName="/stake" pageName="Stake" />
      </HStack>
      <Spacer />
      <HStack spacing="3">
        <IconButton
          aria-label="Toggle light or dark mode"
          variant="ghost"
          icon={colorMode === "dark" ? <FaSun /> : <FaRegMoon />}
          onClick={toggleColorMode}
        />
        <Button>Connect</Button>
      </HStack>
    </Flex>
  );
};
