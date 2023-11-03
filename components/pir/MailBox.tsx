import { Bucket, Client } from '@blyss/sdk';
import { Flex, Card, useMantineTheme, TextInput, Textarea, Button, Title } from '@mantine/core';
import React, { useState } from 'react';

export interface Log {
  to: string;
  isRetrieval: boolean;
  tookMs: number;
}

export function LogMessage({ to, isRetrieval, tookMs }: Log) {
  const tookMsg = <span style={{ color: '#666', paddingLeft: 5 }}>({Math.round((tookMs / 1000) * 10) / 10} s)</span>;
  return (
    <>
      <div className="logline">
        {!isRetrieval ? (
          <>
            Write: ? bytes to mailbox {to}. {tookMsg}
          </>
        ) : (
          <>
            PrivateRead: ? bytes from mailbox {to}. {tookMsg}
          </>
        )}
      </div>
    </>
  );
}

// This function gets called only on the first query
async function setup(apiKey: string): Promise<Bucket> {
  const client = new Client(apiKey);

  // Create the bucket, if it doesn't exist.
  // By default, only you can read and write from the buckets you create.
  // To make a bucket others can read, prefix the name with "global."
  const bucketName = 'global.private-messages-1';
  if (!(await client.exists(bucketName))) {
    console.log('creating bucket');
    await client.create(bucketName);
  }

  // Connect to your bucket
  const bucket = await client.connect(bucketName);

  return bucket;
}

async function deriveMessageKey(recipient: string): Promise<CryptoKey> {
  // 0.1. Create base key material from recipient handle
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(recipient),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const pkbdf2Params = {
    name: 'PBKDF2',
    salt: new TextEncoder().encode('blyss-mail'),
    iterations: 100000,
    hash: 'SHA-256'
  };

  const aesGenKeyParams = {
    name: 'AES-GCM',
    length: 256
  };

  const key = await window.crypto.subtle.deriveKey(pkbdf2Params, baseKey, aesGenKeyParams, false, [
    'encrypt',
    'decrypt'
  ]);

  return key;
}

async function computeServerKey(mailbox: string): Promise<string> {
  // 2.2. Hash recipient's handle to get destination key on server
  const hash = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(mailbox));
  // 2.3. Convert hash to base64 string
  const targetKey = window.btoa(String.fromCharCode(...new Uint8Array(hash)));
  return targetKey;
}

function MessageCard({ body }: { body: any }) {
  const theme = useMantineTheme();
  return (
    <Card radius="md" h={400} w={300} style={{ border: '1px solid ' + theme.colors.blyssPink[6] }}>
      <Flex w="100%" h="100%" direction="column" justify="space-around" ff="IBM Plex Mono" fz={16}>
        {body}
      </Flex>
    </Card>
  );
}

function MessageButton({ loading, t1, t2 }: { loading: boolean; t1: string; t2: string }) {
  const theme = useMantineTheme();
  return (
    <Flex>
      <Button
        type="submit"
        disabled={loading}
        variant="gradient"
        gradient={{ from: theme.colors.blyssPink[7], to: theme.colors.blyssPink[5], deg: 35 }}>
        {loading ? t1 : t2}
      </Button>
      <div>{loading ? <div className="loader"></div> : null}</div>
    </Flex>
  );
}

function SendMessageCard({
  loading,
  handler
}: {
  loading: boolean;
  handler: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const theme = useMantineTheme();
  const body = (
    <>
      <Flex justify="center">
        <Title order={2}> Send</Title>
      </Flex>
      <Title order={4}>📬 destination mailbox:</Title>
      <TextInput type="text" id="to" title="up to 500 Unicode chars, enforced by truncation." required />
      <Title order={4}>Message:</Title>
      <Textarea
        id="msg"
        title="UTF8 up to 1KiB, enforced by truncation. Message will be client-side encrypted, using a key derived from the recipient's name."
        required
      />
      <MessageButton loading={loading} t1="posting..." t2="post message" />
    </>
  );
  return (
    <form onSubmit={handler}>
      <MessageCard body={body} />
    </form>
  );
}

function PrivateReceiveMessageCard({
  loading,
  fetchedMessage,
  handler
}: {
  loading: boolean;
  fetchedMessage: string;
  handler: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const theme = useMantineTheme();
  const body = (
    <>
      <Flex justify="center">
        <Title order={2}>Private Retrieve</Title>
      </Flex>
      <Title order={4}>📫 mailbox to check:</Title>
      <TextInput type="text" id="to" title="up to 500 Unicode chars, enforced by truncation." required />
      <Title order={4}>Received message:</Title>
      <Textarea id="msg" variant="unstyled" value={fetchedMessage} title="display for the fetched message." readOnly />
      <MessageButton loading={loading} t1="fetching..." t2="fetch message" />
    </>
  );

  return (
    <form onSubmit={handler}>
      <MessageCard body={body} />
    </form>
  );
}

// UI
export default function App() {
  const [bucketHandle, setBucketHandle] = useState<Bucket | undefined>();
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [apiKey, setApiKey] = useState('CSdK3rKXvb4zb43AgycQn6KAmJDILMXU8IWUHrn7');
  const [numMessages, setNumMessages] = useState(Math.floor(Math.random() * 100) + 950);
  const [fetchedMessage, setfetchedMessage] = useState('');

  const [trace, setTrace] = useState<Log[]>([]);
  const logMessage = (t: Log) => setTrace([t, ...trace]);

  async function animatePost(to: string, message: string): Promise<void> {
    setPosting(true);

    // enforce size limits
    if (to.length > 500) {
      to = to.slice(0, 500);
    }
    if (message.length > 1000) {
      message = message.slice(0, 500);
    }

    // 0. Derive an encryption key from the recipient's handle
    const key = await deriveMessageKey(to);

    // 1. Get a handle to the bucket
    let bucket = bucketHandle;
    if (!bucket) {
      console.log('setup!');
      bucket = await setup(apiKey);
      setBucketHandle(bucket);
    }

    // 2.1. Encrypt the message
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedMessage = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      new TextEncoder().encode(message)
    );

    // 2.2. Prepend iv to encrypted message
    const encryptedMessageWithIv = new Uint8Array([...iv, ...new Uint8Array(encryptedMessage)]);

    // 2.3. Write encrypted message to KV server
    const serverKey = await computeServerKey(to);
    const start = performance.now();
    const _ = await bucket.write({
      [serverKey]: encryptedMessageWithIv
    });
    const tookMs = performance.now() - start;
    const isRetrieval = false;

    // 3. Log the result to the UI
    logMessage({
      to,
      isRetrieval,
      tookMs
    });

    setPosting(false);
  }

  async function animateFetch(to: string): Promise<void> {
    setLoading(true);

    // enforce size limits
    if (to.length > 500) {
      to = to.slice(0, 500);
    }

    // 1. Get a handle to the bucket
    let bucket = bucketHandle;
    if (!bucket) {
      console.log('setup!');
      bucket = await setup(apiKey);
      setBucketHandle(bucket);
    }

    // 2. Retrieve the specified mailbox
    const serverKey = await computeServerKey(to);
    const start = performance.now();
    const fetchedResult = await bucket.privateRead(serverKey);
    const tookMs = performance.now() - start;
    const isRetrieval = true;

    // 3. Log the result to the UI
    logMessage({
      to,
      isRetrieval,
      tookMs
    });

    if (fetchedResult === null) {
      // 4.1 If the mailbox is empty, we're done
      console.log('no messages yet :(');
      setfetchedMessage('no messages yet :(');
    } else {
      // 4.2 Decrypt the message
      console.log('decrypting message...');
      const key = await deriveMessageKey(to);
      const decryptedMessage = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: fetchedResult.slice(0, 12)
        },
        key,
        fetchedResult.slice(12)
      );
      const decodedMessage = new TextDecoder().decode(decryptedMessage);
      setfetchedMessage(decodedMessage);
    }

    setLoading(false);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const to = (event.target as any).to.value;
    const msg = (event.target as any).msg.value;
    console.log('Sending message ' + msg + ' to mailbox ' + to);
    return animatePost(to, msg);
  };

  const handleFetch = (event: React.FormEvent) => {
    event.preventDefault();
    const to = (event.target as any).to.value;
    console.log('Checking mailbox: ' + to + '...');
    return animateFetch(to);
  };

  return (
    <Flex direction={'column'} rowGap={20}>
      <Flex w="100%" justify={'space-around'} gap={20}>
        <SendMessageCard loading={posting} handler={handleSubmit}></SendMessageCard>
        <PrivateReceiveMessageCard
          loading={loading}
          fetchedMessage={fetchedMessage}
          handler={handleFetch}></PrivateReceiveMessageCard>
      </Flex>
      <Flex direction={'column'} rowGap={10}>
        <Title order={2}>Log</Title>
        <Flex direction={'column'} rowGap={5}>
          {trace.length > 0
            ? trace.map((t, i) => (
                <div key={i}>
                  <LogMessage {...t} />
                </div>
              ))
            : null}
        </Flex>
      </Flex>
    </Flex>
  );
}
