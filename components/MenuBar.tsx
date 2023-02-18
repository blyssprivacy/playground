import { Anchor, Box, Button, Flex, Grid, Group, MediaQuery, Menu } from '@mantine/core';
import ActionButton from './ActionButton';
import BlyssLogotype from './BlyssLogotype';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { UserProfile } from '@auth0/nextjs-auth0/client';

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
      }}>
      <Flex
        m={0}
        p={0}
        align="center"
        style={{ width: '100%', maxWidth: 1040, flexGrow: 1, justifyContent: 'space-between' }}>
        <Flex w={212} align="center">
          <BlyssLogotype href={href} />
          {/* <FineLine /> */}
        </Flex>
        <Flex align="center" justify="flex-end" style={{ flexGrow: 1 }}>
          <Flex gap={32} mr={64}></Flex>
          {user ? (
            <Menu position="bottom-end" width="target" offset={2}>
              <Menu.Target>
                <Button
                  variant="subtle"
                  color="gray"
                  rightIcon={<IconChevronDown size={14} />}
                  style={{ fontSize: 14 }}>
                  {user?.email || user.name}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  sx={{ textTransform: 'uppercase', fontSize: 12 }}
                  rightSection={<IconLogout size={14} />}
                  component="a"
                  href="/api/auth/logout">
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}
