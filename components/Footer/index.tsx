import { Flex, Heading, HStack, Text } from "@chakra-ui/react";

import { SocialIcon } from "./SocialIcon";
import { FaDiscord, FaGithub, FaTelegram } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";

export const Footer = () => {
  return (
    <Flex my="12" flexDir="row" justifyContent="center" alignItems="center">
      <Heading fontSize="lg">U R U Z</Heading>
      <HStack ml="6">
        <SocialIcon icon={SiGitbook} aria="documents" />
        <SocialIcon icon={FaGithub} aria="github" />
        <SocialIcon icon={FaDiscord} aria="discord" />
        <SocialIcon icon={FaTelegram} aria="telegram" />
      </HStack>
    </Flex>
  );
};
