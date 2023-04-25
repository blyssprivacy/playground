import { Box, Card, Center, Flex, Group, Stack, Sx, Text, Title, useMantineTheme } from '@mantine/core';
import {
  IconBook,
  IconCoinBitcoin,
  IconShieldLock,
  IconMail,
  IconSquareAsterisk,
  IconUnlink
} from '@tabler/icons-react';
import MenuBar from '../components/MenuBar';

export default function SSRPage() {
  let theme = useMantineTheme();

  let demos = [
    {
      title: 'Private password checker',
      link: '/passwords',
      target: undefined,
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'cyan.9', to: 'indigo.9', deg: 45 }) } as Sx,
      cardHeaderBody: Array(3)
        .fill(0)
        .map((_, i) => <IconSquareAsterisk key={i} color={theme.colors.gray[4]} size={64} />),
      description: 'Privately check passwords against the "Have I Been Pwned?" database of breached passwords.'
    },
    {
      title: 'Private inbox',
      link: '/mailboxes',
      target: undefined,
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'pink.4', to: 'pink.8', deg: 45 }) } as Sx,
      cardHeaderBody: (
        <Flex justify="center" align="center">
          <IconShieldLock key={0} color={theme.colors.gray[4]} size={64} />
          <IconMail key={0} color={theme.colors.gray[4]} size={64} />
        </Flex>
      ),
      description: 'Send and receive short messages or files. Retrievals are fully anonymous.'
    },
    {
      title: 'Private ENS resolver',
      link: 'https://sprl.it',
      target: '_blank',
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'grape.9', to: 'violet.9', deg: 135 }) } as Sx,
      cardHeaderBody: <IconUnlink color={theme.colors.gray[4]} size={64} />,
      description: 'Privately resolve ".eth" domain names into URLs, using sharable links like "sprl.it/#vitalik.eth".'
    },
    {
      title: 'Private Wikipedia',
      link: 'https://spiralwiki.com',
      target: '_blank',
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'gray.8', to: 'gray.7', deg: 0 }) } as Sx,
      cardHeaderBody: <IconBook color={theme.colors.gray[4]} size={64} />,
      description: 'Privately read English Wikipedia. The articles you read are never revealed to the server.'
    },
    {
      title: 'Private Bitcoin balance checker',
      link: '/bitcoin',
      target: undefined,
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'teal.9', to: 'green.8', deg: 90 }) } as Sx,
      cardHeaderBody: (
        <Flex justify="center" align="center">
          <IconCoinBitcoin color={theme.colors.gray[0]} size={48} />
        </Flex>
      ),
      description:
        'Check the live balance and recent transactions of any Bitcoin address. The server never sees your addresses.'
    }
  ];

  return (
    <>
      <MenuBar href="https://blyss.dev" />
      <Stack mt={128} mb={128} fz="lg">
        <Title order={1} color="white">
          Playground
        </Title>
        <Box>
          <Flex gap={48} wrap="wrap">
            {demos.map((demo, i) => {
              return (
                <Card
                  key={i}
                  maw={320}
                  shadow="sm"
                  radius="md"
                  component="a"
                  href={demo.link}
                  target={demo.target}
                  withBorder>
                  <Card.Section>
                    <Center h={128} sx={demo.cardHeaderStyle}>
                      {demo.cardHeaderBody}
                    </Center>
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{demo.title}</Text>
                    {/* <Badge color="green" variant="dot">
                      Live
                    </Badge> */}
                  </Group>

                  <Text size="md" color="dimmed">
                    {demo.description}
                  </Text>
                </Card>
              );
            })}
          </Flex>
        </Box>
      </Stack>
    </>
  );
}
