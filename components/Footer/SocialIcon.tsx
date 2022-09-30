import { Flex, Text, Icon } from "@chakra-ui/react";

export const SocialIcon = ({ icon, aria, link }: any) => {
  return (
    <Flex
      p="2"
      cursor="pointer"
      _hover={{
        color: "gray.600",
      }}
      as="a"
      href={link}
      target="_blank"
    >
      <Icon as={icon} aria-label={aria} />
    </Flex>
  );
};
