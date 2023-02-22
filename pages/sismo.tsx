import { Anchor, Skeleton, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import MenuBar from '../components/MenuBar';

const SismoChecker = dynamic(() => import('../components/SismoChecker'), {
  ssr: false,
  loading: () => <Skeleton w={544} h={50} />
});

export default function SSRPage() {
  // This is a read-only key, so safe to publish
  const readOnlyDefaultApiKey = 'F5arNFk08m9gNDcZjzOEs9TlM6yWgPhk6iO1GUGW';

  return (
    <>
      <MenuBar href="https://blyss.dev" />
      <Stack mt={128} fz="lg">
        <Stack maw={780}>
          <Title order={1} color="white">
            Check eligible badges
            <Text inherit component="span" color="blyssPink" fs="italic" ml={8} mr={4}>
              privately
            </Text>
            .
          </Title>
          <Text color="white">
            We use homomorphic encryption to check which <Anchor href="https://www.sismo.io/">Sismo badges</Anchor> the
            given account is eligible for.
          </Text>
          <Text>
            <SismoChecker apiKey={readOnlyDefaultApiKey} />
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
