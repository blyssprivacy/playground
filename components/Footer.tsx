import { Anchor, Box, Text, Flex } from '@mantine/core';
import BlyssLogotype from './BlyssLogotype';
import SocialIcon from './SocialIcon';


function Socials() {
  return (
    <Flex justify="center" gap={24}>
      <Anchor href="https://github.com/blyssprivacy/sdk">
        <SocialIcon kind="github" />
      </Anchor>
      <Anchor href="https://twitter.com/blyssdev">
        <SocialIcon kind="twitter" />
      </Anchor>
    </Flex>
  );
}

export default function Footer() {
  return (
    <Box>
      <Box style={{ borderBottom: '1px solid grey', marginBottom: '2vh' }}></Box>
      <Flex direction="row" justify="space-between" align="flex-start">
        <Flex direction="column" gap="2vh">
          <BlyssLogotype />
          <Text size="lg">
            Confidential AI for everyone.
          </Text>

        </Flex>
        <Flex direction="column" gap="2vh">
          <Text size="lg" style={{ textAlign: 'right' }}>
            <Anchor href="/#ai">Confidential AI</Anchor>
            <br />
            <Anchor href="/#buckets">Blyss Buckets</Anchor>
            <br />
            <Anchor href="/console">API Console</Anchor>
          </Text>

          <Box style={{ marginLeft: '20px' }}>
            <Socials />
          </Box>
        </Flex>
      </Flex>
      <Box style={{ marginTop: '3vh' }}></Box>
    </Box>
  );
}
