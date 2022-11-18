import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { DAppProvider, AuroraTestnet, Config } from "@usedapp/core";

import { Header } from "@components/Header";
import theme from "@styles/theme";
import "@styles/fonts";
import "@styles/styles.css";
import { Footer } from "@components/Footer";
import { config } from "@constants/config";

const dappConfig: Config = {
  autoConnect: true,
  readOnlyChainId: AuroraTestnet.chainId,
  readOnlyUrls: {
    [AuroraTestnet.chainId]: config.networkUrl,
  },
  networks: [AuroraTestnet],
  // pollingInterval: 12000,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DAppProvider config={dappConfig}>
        <Head>
          <title>Uruz Finance</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </DAppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
