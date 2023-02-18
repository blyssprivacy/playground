import { Anchor, Box, Button, Flex, Grid, Group, MediaQuery, Menu } from '@mantine/core';
import ActionButton from './ActionButton';
import BlyssLogotype from './BlyssLogotype';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import SocialIcon from './SocialIcon';

function FineLine() {
  return <Box style={{ borderRight: '1px solid transparent', height: 22 }}></Box>;
}

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Anchor href={href} transform="uppercase" fw={400} c="gray.3" style={{ letterSpacing: '2%' }}>
      {children}
    </Anchor>
  );
}

export default function MenuBar({ user, href }: { user?: UserProfile; href?: string }) {
  return (
    <Flex
      m={0}
      mt={24}
      align="center"
      justify="center"
      style={{
        height: 77,
        flexGrow: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        padding: '0 20px'
      }}
      wrap="wrap">
      <Flex
        wrap="wrap"
        m={0}
        py={10}
        pr={10}
        align="center"
        style={{
          width: '100%',
          maxWidth: 1172,
          flexGrow: 1,
          justifyContent: 'flex-start',
          backgroundColor: '#1a1816',
          borderRadius: 12
        }}>
        <Flex align="center" pl={64} gap={96}>
          <Box>
            <BlyssLogotype href={href} />
          </Box>
          <FineLine />
        </Flex>
        <Flex align="center" justify="flex-start" sx={{ flexGrow: 1 }} pl={96} gap={64}>
          <MenuItem href="/">Playground</MenuItem>
          <MenuItem href="https://docs.blyss.dev">Docs</MenuItem>
        </Flex>
        <Flex align="center" justify="flex-end" style={{ flexGrow: 1 }} gap={32}>
          <Flex gap={24}>
            <SocialIcon kind="github" />
            <SocialIcon kind="twitter" />
          </Flex>
          <ActionButton href="https://console.blyss.dev">Get an API key</ActionButton>
        </Flex>{' '}
      </Flex>
    </Flex>
  );
}
