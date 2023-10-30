import { useAuth, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import {
  ActionIcon,
  Box,
  Card,
  CopyButton,
  Flex,
  Group,
  MediaQuery,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ApiKeys, { ApiKeyData } from '../components/ApiKeys';
import Buckets, { BucketMetadata } from '../components/Buckets';
import MenuBar from '../components/MenuBar';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export interface ListApiKeysResponse {
  keys: ApiKeyData[] | null;
}

const BlyssEnvironments = [
  { value: 'https://alpha.api.blyss.dev', label: 'alpha' },
  { value: 'https://dev2.api.blyss.dev', label: 'dev2' },
  { value: 'https://staging.api.blyss.dev', label: 'staging' },
  { value: 'http://localhost:8000', label: 'local' }
];

interface EnvSelectorProps {
  apiEndpoint: string;
  setApiEndpoint: Dispatch<SetStateAction<string>>;
}

const EnvSelector = ({ apiEndpoint, setApiEndpoint }: EnvSelectorProps) => {
  return (
    <Flex direction="column" align="flex-start" gap={10}>
      <Title order={2} color="white">
        API Endpoint
      </Title>
      <Flex justify="flex-start" align="center" gap={10}>
        <span>Region:</span>
        <Select
          data={BlyssEnvironments}
          value={apiEndpoint}
          onChange={value => {
            if (value !== null) {
              setApiEndpoint(value);
            }
          }}
        />
      </Flex>
      <Text>URL:</Text>
      <BucketEnv env={apiEndpoint} />
    </Flex>
  );
};

function BucketEnv({ env }: { env: string }) {
  return (
    <MediaQuery largerThan="md" styles={{ width: '400px !important', fontSize: '10px !important' }}>
      <Card
        shadow="sm"
        p="md"
        radius="md"
        withBorder
        style={{ width: '100%', wordBreak: 'break-all', fontSize: '10px' }}>
        <Stack spacing="xl" p={0}>
          <Group position="apart">
            <Text weight={500} ff="'Source Code Pro', monospace" fz="sm">
              {env}
            </Text>
            <CopyButton value={env!} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} color={copied ? 'teal' : 'gray'} position="left" withArrow>
                  <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                    {copied ? <IconCheck size={16} strokeWidth={1} /> : <IconCopy size={16} strokeWidth={1} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </Stack>
      </Card>
    </MediaQuery>
  );
}

async function getApiKeys(apiEndpoint: string, jwt: string): Promise<ListApiKeysResponse> {
  const res = await fetch(apiEndpoint + '/list-api-keys', {
    method: 'get',
    headers: new Headers({
      Authorization: jwt
    })
  });
  if (!res.ok) {
    return { keys: null };
  }

  const data = await res.json();
  return data as ListApiKeysResponse;
}

export type ListBucketsResponse = {
  buckets: BucketMetadata[] | null;
};

async function listBuckets(apiEndpoint: string, apiKey: string): Promise<ListBucketsResponse> {
  const res = await fetch(apiEndpoint + '/list-buckets', {
    method: 'get',
    headers: new Headers({
      'x-api-key': apiKey
    })
  });

  if (!res.ok) {
    return { buckets: null };
  }

  const data = await res.json();
  return data as ListBucketsResponse;
}

export default function SSRPage() {
  const [apiEndpoint, setApiEndpoint] = useState(BlyssEnvironments[0].value);
  const [apiKeys, setApiKeys] = useState<ApiKeyData[] | null>([]);
  const [buckets, setBuckets] = useState<BucketMetadata[] | null>([]);
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);

  // Fetch token, API keys, and buckets on mount
  useEffect(() => {
    const asyncEffect = async () => {
      setLoading(true);
      const token = await getToken({ template: 'blyss' });
      if (!token || !apiEndpoint) {
        return;
      }
      const keysResp = await getApiKeys(apiEndpoint, token);
      setApiKeys(keysResp.keys);
      // retrieve buckets for the first key, or null if no keys
      let buckets: BucketMetadata[] | null = null;
      if (keysResp.keys && keysResp.keys[0] && keysResp.keys[0].secret) {
        const listResp = await listBuckets(apiEndpoint, keysResp.keys[0].secret);
        buckets = listResp.buckets;
      }
      setBuckets(buckets);
    };
    asyncEffect()
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [apiEndpoint]);

  return (
    <Box>
      <SignedIn>
        <Flex justify="flex-start" rowGap={50} align="flex-start" direction="column">
          <MenuBar />

          <EnvSelector apiEndpoint={apiEndpoint} setApiEndpoint={setApiEndpoint} />

          <ApiKeys apiKeys={apiKeys} loading={loading} />
          {/* <Buckets buckets={buckets} loading={loading} /> */}
        </Flex>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Box>
  );
}
