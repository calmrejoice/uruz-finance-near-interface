import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Head from "next/head";

import { Header } from "@components/Header";
import theme from "@styles/theme";
import "@styles/fonts";
import "@styles/styles.css";
import { Footer } from "@components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Uruz Finance</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
