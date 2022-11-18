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
import { useEthers, AuroraTestnet } from "@usedapp/core";
import { truncateHash } from "@utils/formatBalance";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const { account, deactivate, chainId, activateBrowserWallet, switchNetwork } =
    useEthers();

  const wrongNetwork = chainId !== AuroraTestnet.chainId;

  const renderButton = () => {
    if (!account) {
      return <Button onClick={activateBrowserWallet}>Connect</Button>;
    } else if (wrongNetwork) {
      return (
        <Button
          colorScheme="red"
          variant="solid"
          fontSize="sm"
          onClick={async () => {
            await switchNetwork(AuroraTestnet.chainId);
          }}
        >
          Wrong Network
        </Button>
      );
    } else {
      return <Button>{truncateHash(account)}</Button>;
    }
  };

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
        {renderButton()}
      </HStack>
    </Flex>
  );
};
