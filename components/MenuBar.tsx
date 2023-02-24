import { Anchor, Box, Burger, Button, Flex, Grid, Group, MediaQuery, Menu } from '@mantine/core';
import ActionButton from './ActionButton';
import BlyssLogotype from './BlyssLogotype';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import SocialIcon from './SocialIcon';
import { useState } from 'react';

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

function Playground() {
  return <MenuItem href="/">Playground</MenuItem>;
}
function Docs() {
  return <MenuItem href="https://docs.blyss.dev">Docs</MenuItem>;
}

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

export default function MenuBar({
  user,
  href,
  maw = 'auto'
}: {
  user?: UserProfile;
  href?: string;
  maw?: number | string;
}) {
  const [opened, setOpened] = useState(false);
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

      <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
        <Flex justify="space-evenly" gap={24}>
          <Playground />
          <Docs />
        </Flex>
      </MediaQuery>
      <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
        <Flex>
          <FineLine />
        </Flex>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        {/* TODO: replace with Socials component, but idk how to passthrough the styling from MediaQuery */}
        <Flex gap={24}>
          <Anchor href="https://github.com/blyssprivacy/sdk">
            <SocialIcon kind="github" />
          </Anchor>
          <Anchor href="https://twitter.com/blyssdev">
            <SocialIcon kind="twitter" />
          </Anchor>
        </Flex>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Flex>
          <FineLine />
        </Flex>
      </MediaQuery>

      <ActionButton p={0} href="https://console.blyss.dev">
        Get an API key
      </ActionButton>

      <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
        <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
          <Menu.Target>
            <Burger opened={opened} onClick={() => setOpened(o => !o)} />
          </Menu.Target>

          <Menu.Dropdown>
            {/* <Menu.Label>Application</Menu.Label> */}
            <Menu.Item>
              <Playground />
            </Menu.Item>
            <Menu.Item>
              <Docs />
            </Menu.Item>

            <Menu.Divider />
            <Box p={10}>
              <Socials />
            </Box>
          </Menu.Dropdown>
        </Menu>
      </MediaQuery>
    </Flex>
  );
}
