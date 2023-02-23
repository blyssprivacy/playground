import { Anchor, Box, Button, Flex, Grid, Group, MediaQuery, Menu } from '@mantine/core';
import ActionButton from './ActionButton';
import BlyssLogotype from './BlyssLogotype';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import SocialIcon from './SocialIcon';

function FineLine() {
  return <Box style={{ borderRight: '1px solid grey', height: 22 }}></Box>;
}

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Anchor href={href} transform="uppercase" fw={400} c="gray.3" style={{ letterSpacing: '2%' }}>
      {children}
    </Anchor>
  );
}

export default function MenuBar({
  user,
  href,
  maw = 'auto'
}: {
  user?: UserProfile;
  href?: string;
  maw?: number | string;
}) {
  return (
    <Flex
      m={0}
      p={10}
      align="center"
      justify="space-evenly"
      maw={maw}
      style={{
        width: '100%',
        backgroundColor: '#1a1816',
        borderRadius: 12,
        border: '1px solid #333'
      }}>
      <BlyssLogotype href={href} />
      <FineLine />
      <Flex justify="space-evenly" gap={24}>
        <MenuItem href="/">Playground</MenuItem>
        <MenuItem href="https://docs.blyss.dev">Docs</MenuItem>
      </Flex>
      <FineLine />
      <Flex gap={24}>
        <Anchor href="https://github.com/blyssprivacy/sdk">
          <SocialIcon kind="github" />
        </Anchor>
        <Anchor href="https://twitter.com/blyssdev">
          <SocialIcon kind="twitter" />
        </Anchor>
      </Flex>
      <FineLine />

      <ActionButton href="https://console.blyss.dev">Get an API key</ActionButton>
    </Flex>
  );
}
