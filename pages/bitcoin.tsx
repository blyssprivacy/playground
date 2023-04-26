import { Anchor, Code, Skeleton, Stack, Text, Title } from '@mantine/core';
import dynamic from 'next/dynamic';
import MenuBar from '../components/MenuBar';

const BitcoinLookup = dynamic(() => import('../components/BitcoinLookup'), {
  ssr: false,
  loading: () => <Skeleton w={544} h={50} />
});

export default function SSRPage() {
  const readOnlyBitcoinApiKey = 'dOVAA9IJEB6Ncz6XeJdO73bbwyEAgu3T5TsYcdB4';

  return (
    <>
      <MenuBar href="https://blyss.dev" />
      <Stack mt={64} fz="lg">
        <Stack maw={780}>
          <Title order={1} color="white">
            Fetch Bitcoin balances
            <Text inherit component="span" color="blyssPink" fs="italic" ml={8} mr={4}>
              privately
            </Text>
            .
          </Title>
          <Text color="white">
            This tool uses homomorphic encryption to privately fetch the current balance of any Bitcoin address. No one,
            including us, can see the address you are querying.
          </Text>
          <Text color="white">
            On first use, your browser creates a strong encryption key that will never leave your device. All queries
            you make are encrypted under this key. We also use this key to derive some client-specific setup data that
            is uploaded (roughly 1MB) to the server, which enables homomorphic computation for your key.
          </Text>
          <Text maw={650}>
            <BitcoinLookup apiKey={readOnlyBitcoinApiKey} />
          </Text>

          <Title order={2} color="white">
            Why use this tool?
          </Title>
          <Text color="white">
            Blyss offers the strongest notion of wallet privacy, comparable to running a full node on your own computer.
            Let's compare it to other options: <br></br>
            {/* Public block explorers: aggressively collect and monetize all visible data (like your IP address, browser
            settings, etc.). This personal data is linked to the Bitcoin addresses you look up. <br></br>
            Fetching compact block filters from trusted full nodes: block filters are useful privacy improvements, but
            still necessarily leak some information. Over time, addresses you query repeatedly are exposed. <br></br>
            Query full nodes over Tor: the addresses you look up may still be linked. <br></br> */}
            If you use public block explorers, servers can associate your Bitcoin address and your IP. <br></br>
            If you use compact block filters, an observer may still be able to infer your address. <br></br>
            If you use Tor, the addresses you look up may still be linked.<br></br>
            If you run a full node in the cloud, you have to completely trust your cloud provider. <br></br>
            Blyss keeps your addresses private and unlinkable.
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
