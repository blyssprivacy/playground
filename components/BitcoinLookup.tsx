import { Bucket, Client } from '@blyss/sdk';
import { ActionIcon, Button, Code, Collapse, Group, Loader, Overlay, Stack, TextInput, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';

function attemptGetLocalStorage(key: string): string | undefined {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem(key) || undefined;
  } else {
    return undefined;
  }
}

function attemptSetLocalStorage(key: string, value: string | undefined) {
  if (typeof window !== 'undefined' && window.localStorage && typeof value !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}

// Only gets called only on the first check
async function setup(apiKey: string): Promise<Bucket | null> {
  const client = new Client({
    apiKey,
    endpoint: 'https://dev2.api.blyss.dev'
  });
  const bucketName = 'global.btc-balances-v2';
  const secretSeed = attemptGetLocalStorage('blyss.bitcoin.secretSeed');

  let bucket = null;
  try {
    bucket = await client.connect(bucketName, secretSeed);
    attemptSetLocalStorage('blyss.bitcoin.secretSeed', bucket.toSecretSeed());
  } catch (e) {
    console.error(e);
    alert('Bitcoin lookup is down for maintenance. Please try again later.');
  }

  return bucket;
}

interface BitcoinJSON {
  balance: number;
  txns: { height: number; amount: number }[];
}

function BitcoinLookup({ apiKey }: { apiKey: string }) {
  const [addr, setAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const [didSetup, setDidSetup] = useState(false);
  const [result, setResult] = useState<null | undefined | BitcoinJSON>(undefined);
  const [bucketHandle, setBucketHandle] = useState<Bucket | undefined>();

  let setupAction = async () => {
    setSetupLoading(true);

    let bucket = await setup(apiKey);
    if (bucket === null) {
      throw new Error('Failed to setup bucket');
    }
    let publicUUID = attemptGetLocalStorage('blyss.bitcoin.publicUUID');
    await bucket.setup(publicUUID);
    attemptSetLocalStorage('blyss.bitcoin.publicUUID', bucket.uuid);

    setBucketHandle(bucket);
    setSetupLoading(false);
    setDidSetup(true);
  };

  // When clicked, connect to the bucket and make the private read
  let clickAction = async () => {
    if (!(addr.startsWith('1') || addr.startsWith('3') || addr.startsWith('bc1'))) {
      alert('Invalid address');
      return;
    }

    setLoading(true);
    console.time('lookup');

    // console.log('fetching meta');
    // const metaResult = await bucketHandle?.privateRead('meta');
    // console.log(metaResult);

    const addrInfo: BitcoinJSON | null = await bucketHandle?.privateRead(addr);
    console.log(addrInfo);
    setResult(addrInfo);

    console.timeEnd('lookup');
    setLoading(false);
  };

  let resultMsg = null;
  if (result !== undefined) {
    if (result === null) {
      resultMsg = <Title order={3}>No data found for this address</Title>;
    } else {
      // create a table of results, showing each transaction. Each object in txns
      // is a dictionary with exactly two keys: height and amount.
      let txns = result.txns.map((txn, i) => {
        let height = txn.height;
        let amount = txn.amount;
        return (
          <Stack key={i} justify="space-between">
            <Title order={4}>Height: {height}</Title>
            <Title order={4}>Amount: {amount}</Title>
          </Stack>
        );
      });

      resultMsg = (
        <Stack spacing="sm">
          <Title order={3}>Balance: {result.balance}</Title>
          <Title order={3}>Transactions:</Title>
          <Stack spacing="sm">{txns}</Stack>
        </Stack>
      );
    }
  }

  return (
    <Stack w="100%" pos="relative" pt="md">
      {!didSetup && (
        <Overlay blur={2} center color="#101113" opacity={0.5} w="110%" left="-5%" zIndex={100}>
          <Button
            color="violet"
            rightIcon={setupLoading ? <Loader size="sm" color="white" /> : null}
            onClick={setupAction}>
            Perform one-time setup
          </Button>
        </Overlay>
      )}
      <form
        onSubmit={async e => {
          e.preventDefault();
          await clickAction();
        }}>
        <Group spacing="sm">
          <TextInput
            sx={{ flexGrow: 1 }}
            placeholder="Bitcoin address (starts with 1, 3, or bc1)"
            size="lg"
            disabled={loading}
            value={addr}
            onChange={e => setAddr(e.target.value)}></TextInput>

          <ActionIcon size="xl">
            {loading ? <Loader /> : <IconArrowRight stroke={1.5} size={32} onClick={clickAction} />}
          </ActionIcon>
        </Group>
      </form>
      <Collapse in={!loading}>{resultMsg}</Collapse>
    </Stack>
  );
}

export default BitcoinLookup;
