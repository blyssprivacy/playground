import {
  Anchor,
  Badge,
  Box,
  MediaQuery,
  Card,
  Center,
  Flex,
  Group,
  List,
  Stack,
  Sx,
  Text,
  Title,
  useMantineTheme,
  Space,
  Button
} from '@mantine/core';
import {
  IconBook,
  IconCoinBitcoin,
  IconMail,
  IconMessageDots,
  IconShieldLock,
  IconSquareAsterisk,
  IconUnlink
} from '@tabler/icons-react';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import Link from 'next/link';

interface RenderButtonProps {
  link: string;
  text: string;
}
function RenderButton({ link, text }: RenderButtonProps) {
  return (
    <Link href={link}>
      <Button color="brand" variant="outline">
        {text}
      </Button>
    </Link>
  );
}

function SelectiveBr() {
  return (
    <>
      &nbsp;
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <br />
      </MediaQuery>
    </>
  );
}

function ConfidentialAI() {
  let theme = useMantineTheme();

  let demos = [
    {
      title: 'Confidential Coding Assistant',
      link: 'https://enclave.blyss.dev',
      target: undefined,
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'teal.9', to: 'green.7', deg: 45 }) } as Sx,
      cardHeaderBody: <IconMessageDots color={theme.colors.gray[4]} size={64} />,
      description: 'Chat with a code-specialized model (CodeLlama-34B). All exchanges are totally private.'
    }
  ];
  return (
    <Stack fz="xl" id="ai">
      <Group>
        <Title order={1} color="white">
          Confidential AI
        </Title>
        <Badge variant="filled" size="lg">
          New
        </Badge>
      </Group>
      <Text size="xl">
        The privacy of self-hosted AI with the convenience of cloud.
        <SelectiveBr />
        Designed for the data you can't afford to leak.
      </Text>
      <Text size="xl">
        Confidential models run inside secure enclaves, which keep data encrypted even while in use.
        <SelectiveBr />
        It is impossible for anyone - including us - to spy on or tamper with your data.
        <SelectiveBr />
        Read more about our{' '}
        <Anchor href="https://blog.blyss.dev/confidential-ai-from-gpu-enclaves">strong cryptographic security</Anchor>.
      </Text>
      <List>
        <List.Item>
          <Text size="xl">Publicly verifiable chain of trust, tied to the TLS certificate</Text>
        </List.Item>
        <List.Item>
          <Text size="xl">Models specialized for code, embeddings, and more</Text>
        </List.Item>
        <List.Item>
          <Text size="xl">Confidential finetuning option - we train a model for you, and never see your data</Text>
        </List.Item>
      </List>
      <Box>
        <Link href="https://calendar.app.google/n1zVWeURhzx21DJH6">
          <Button color="brand" variant="filled">
            Book a call →
          </Button>
        </Link>
      </Box>
      or try a free public demo:
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
              </Group>

              <Text size="md" color="dimmed">
                {demo.description}
              </Text>
            </Card>
          );
        })}
      </Flex>
    </Stack>
  );
}

function BlyssBuckets() {
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
      link: 'https://btc.blyss.dev',
      target: '_blank',
      cardHeaderStyle: { backgroundImage: theme.fn.gradient({ from: 'yellow.5', to: 'orange.8', deg: 90 }) } as Sx,
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
    <Stack fz="xl" id="buckets">
      <Title order={1} color="white">
        Blyss Buckets
      </Title>
      <Text>
        A cloud key-value store with strong metadata privacy: no entity (not even us) can determine which keys a client
        retrieves.
        <SelectiveBr />
        Built on <Anchor href="https://github.com/blyssprivacy/sdk">open-source</Anchor> homomorphic encryption
        techniques that <Anchor href="https://eprint.iacr.org/2022/368">we published</Anchor>.
      </Text>

      <Flex direction="row" align="flex-start" gap={10}>
        <RenderButton link="https://docs.blyss.dev" text="Docs" />
        <RenderButton link="https://github.com/blyssprivacy/sdk#quick-start-local" text="Quick Start" />
        <RenderButton link="/console" text="API Dashboard" />
      </Flex>

      <Space h={16} />

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
              </Group>

              <Text size="md" color="dimmed">
                {demo.description}
              </Text>
            </Card>
          );
        })}
      </Flex>
    </Stack>
  );
}

export default function SSRPage() {
  return (
    <>
      <MenuBar />
      <ConfidentialAI />
      <Space h="10vh" />
      <BlyssBuckets />
      <Space h="10vh" />
      <Footer />
    </>
  );
}
