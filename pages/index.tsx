import type { NextPage } from "next";
import {
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Input,
  useColorMode,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex m="auto" flexDir="column">
      <VStack>
        <Heading>Next JS with Chakra UI App</Heading>
        <Text>paragraph</Text>
        <Text variant="helper">helper</Text>
        <Button>Button</Button>
        <Button variant="brandLink">Link</Button>
        <Input width="50%" placeholder="type something here..." />
        <Button onClick={toggleColorMode} shadow="lg">
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </VStack>
    </Flex>
  );
};

export default Home;
