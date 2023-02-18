import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Table,
  Tooltip,
  Text,
  CopyButton,
  ActionIcon,
  Stack,
  Spoiler,
  Title,
  Grid,
  Box,
  Flex,
  Center,
  Anchor
} from '@mantine/core';
import { IconCheck, IconCopy, IconQuestionCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';
import HelpBox from './HelpBox';

export interface BucketMetadata {
  name: string;
  global_version: number;
}

function DataDisplay({ label, children, hint }: { label: string; children: ReactNode; hint?: any }) {
  let output = (
    <Stack spacing={0}>
      <Text fz="sm" weight="bold" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {label} {hint ? <HelpBox hint={hint} /> : null}
      </Text>
      {children}
    </Stack>
  );

  return <Box>{output}</Box>;
}

function Bucket({ data }: { data: BucketMetadata }) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder maw={400}>
      <Stack spacing="xl" p={0}>
        <Title order={3}>{data.name}</Title>
        <DataDisplay
          label="Data version"
          hint="The version number for the data stored in this bucket. It's incremented on every write.">
          {data.global_version}
        </DataDisplay>
      </Stack>
    </Card>
  );
}

function NoBuckets() {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder maw={400} h={180}>
      <Center h="100%">
        <Text component="p" align="center" maw={200}>
          You don't have any buckets.
          <br />
          <br />
          Create your first one using the <Anchor href="https://docs.blyss.dev">getting started guide</Anchor>.
        </Text>
      </Center>
    </Card>
  );
}

export default function Buckets({ buckets }: { buckets: BucketMetadata[] }) {
  if (buckets.length === 0) {
    return <NoBuckets />;
  }

  return (
    <Flex gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
      {buckets.map(b => {
        return <Bucket key={b.name} data={b} />;
      })}
    </Flex>
  );
}
