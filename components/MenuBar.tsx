import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Anchor, Box, Burger, Button, Flex, MediaQuery, Menu } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import BlyssLogotype from './BlyssLogotype';
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

function Buckets() {
  return <MenuItem href="/#buckets">Buckets</MenuItem>;
}

function ConfidentialAI() {
  return <MenuItem href="/#ai">Confidential AI</MenuItem>;
}

function Blog() {
  return <MenuItem href="https://blog.blyss.dev">Blog</MenuItem>;
}

function SelectiveLine({ breakpoint }: { breakpoint: string }) {
  return (
    <>
      <MediaQuery smallerThan={breakpoint} styles={{ display: 'none' }}>
        <Flex>
          <FineLine />
        </Flex>
      </MediaQuery>
    </>
  );
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

export default function MenuBar({ maw = 'auto' }: { href?: string; maw?: number | string }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [opened, setOpened] = useState(false);

  return (
    <Flex
      m={0}
      p={'10px 5%'}
      align="center"
      justify="space-between"
      maw={maw}
      style={{
        width: '100%',
        backgroundColor: '#1a1816',
        borderRadius: 12,
        border: '1px solid #333',
        marginBottom: '5vh'
      }}>
      <BlyssLogotype />
      <SelectiveLine breakpoint="md" />

      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Flex justify="space-between" gap={48}>
          <ConfidentialAI />
          <Buckets />
        </Flex>
      </MediaQuery>

      <SelectiveLine breakpoint="md" />

      <MediaQuery smallerThan="xl" styles={{ display: 'none' }}>
        <Flex justify="space-between" gap={48}>
          <Blog />
          <Socials />
        </Flex>
      </MediaQuery>

      <SelectiveLine breakpoint="xl" />

      <Flex gap={'10%'} align="center" miw={200} justify="flex-end">
        {isLoaded ? (
          isSignedIn ? (
            <Flex gap={8} align="center" justify="flex-end" sx={{ position: 'relative' }}>
              <Box>
                <Link href="/console">
                  <Button color="brand" fz="sm" w={100}>
                    CONSOLE
                  </Button>
                </Link>
              </Box>
              <MediaQuery largerThan="md" styles={{ position: 'absolute', right: -40 }}>
                <Box>
                  <UserButton />
                </Box>
              </MediaQuery>
            </Flex>
          ) : (
            <SignInButton redirectUrl="/console">
              <Button w={100} color="brand">
                SIGN IN
              </Button>
            </SignInButton>
          )
        ) : (
          <Button w={100} color="brand">
            SIGN IN
          </Button>
        )}

        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target>
              <Burger opened={opened} onClick={() => setOpened(o => !o)} />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <ConfidentialAI />
              </Menu.Item>
              <Menu.Item>
                <Buckets />
              </Menu.Item>

              <Menu.Divider />
              <Box p={10}>
                <Socials />
              </Box>
            </Menu.Dropdown>
          </Menu>
        </MediaQuery>
      </Flex>
    </Flex>
  );
}
