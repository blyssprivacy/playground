import React from 'react';
import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import Buckets, { BucketMetadata } from '../components/Buckets';
import ApiKeys, { ApiKeyData } from '../components/ApiKeys';
import { Box, Stack, Title, Anchor, Text, Alert } from '@mantine/core';
import MenuBar from '../components/MenuBar';
import { IconAlertTriangle } from '@tabler/icons-react';

const API_ROOT = 'https://beta.api.blyss.dev';

export default function SSRPage({
  apiKeys,
  buckets,
  user
}: {
  apiKeys: ApiKeyData[];
  buckets: BucketMetadata[];
  user: UserProfile;
}) {
  return (
    <>
      <MenuBar user={user} />
      <Stack spacing={80} mt={77} pt={40}>
        <Stack spacing="sm">
          <Title order={2}>API Keys</Title>
          <Text>
            These let you write and read to buckets. The{' '}
            <Anchor href="https://docs.blyss.dev">getting started guide</Anchor> has more details.
          </Text>
          <Box mt={8}>
            <ApiKeys apiKeys={apiKeys} />
          </Box>
        </Stack>
        <Stack spacing="sm">
          <Title order={2}>Buckets</Title>
          <Text>These hold key-value data, which you can make private retrievals from.</Text>
          <Box mt={8}>
            <Buckets buckets={buckets} />
          </Box>
        </Stack>
        <Alert maw={600} icon={<IconAlertTriangle size={16} />} title="Beta service" color="blue">
          The public Blyss service is still in beta. To use Blyss in production,{' '}
          <Anchor href="mailto:founders@blyss.dev">contact us</Anchor>.
        </Alert>
      </Stack>
    </>
  );
}

export interface ListApiKeysResponse {
  keys: ApiKeyData[];
}

async function getApiKeys(jwt: string): Promise<ListApiKeysResponse> {
  const res = await fetch(API_ROOT + '/list-api-keys', {
    method: 'get',
    headers: new Headers({
      Authorization: jwt
    })
  });
  const data = await res.json();
  return data as ListApiKeysResponse;
}

export type ListBucketsResponse = {
  buckets: BucketMetadata[];
};

async function listBuckets(apiKey: string): Promise<ListBucketsResponse> {
  const res = await fetch(API_ROOT + '/list-buckets', {
    method: 'get',
    headers: new Headers({
      'x-api-key': apiKey
    })
  });

  if (res.status === 401) {
    return { buckets: [] };
  }

  const data = await res.json();
  return data as ListBucketsResponse;
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res, {
      scopes: ['read:profile']
    });
    const apiKeys = (await getApiKeys(accessToken!)).keys;
    let buckets: BucketMetadata[] = [];
    let bucketNames = new Set();
    for (const apiKeyResult of apiKeys) {
      const apiKey = apiKeyResult.secret!;
      const bucketsForApiKey = (await listBuckets(apiKey)).buckets;
      for (let i = 0; i < bucketsForApiKey.length; i++) {
        const bucket = bucketsForApiKey[i];
        if (!bucketNames.has(bucket.name)) {
          buckets.push(bucket);
          bucketNames.add(bucket.name);
        }
      }
    }

    return {
      props: { apiKeys, buckets }
    };
  }
});
