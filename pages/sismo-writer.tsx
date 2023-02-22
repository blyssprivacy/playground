import { Anchor, Skeleton, Stack, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import MenuBar from '../components/MenuBar';

const SismoWriter = dynamic(() => import('../components/SismoWriter'), {
  ssr: false,
  loading: () => <Skeleton w={544} h={50} />
});

// This page allows you to synchronize data from Sismo to Blyss
// The total runtime, from scratch, is:
//   ~10 minutes for all groups in the 'curated' set
export default function SSRPage() {
  const [apiKey, setApiKey] = useState('');

  return (
    <>
      <MenuBar href="https://blyss.dev" />
      <Stack mt={128} fz="lg">
        <Stack maw={780}>
          <Title order={1} color="white">
            Manage Sismo data.
          </Title>
          <Stack>
            <TextInput
              placeholder="Your write-enabled Blyss API key  (e.g. Xv2PIiwkcvaIbE89BQU3s6YWU5dIm3Bd2qWJrSkm)"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
            <SismoWriter apiKey={apiKey} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
