import { Anchor, Code, Skeleton, Stack, Text, Title } from '@mantine/core';
import dynamic from 'next/dynamic';
import MenuBar from '../components/MenuBar';

const MerkleLookup = dynamic(() => import('../components/MerkleLookup'), {
  ssr: false,
  loading: () => <Skeleton w={544} h={50} />
});

export default function SSRPage() {
  // This is a read-only key, so safe to publish
  const readOnlyDefaultApiKey = 'Ev2PIiwkcvaIbE89BQU3s6YWU5dIm3Bd2qWJrSkm';

  return (
    <>
      <MenuBar />
      <Stack mt={64} fz="lg">
        <Stack maw={780}>
          <Title order={1} color="white">
            Fetch Merkle proofs
            <Text inherit component="span" color="blyssPink" fs="italic" ml={8} mr={4}>
              privately
            </Text>
            .
          </Title>
          <Text color="white">
            This tool uses homomorphic encryption to privately fetch Merkle proofs of inclusion for the{' '}
            <Anchor href="https://worldcoin.org/blog/developers/privacy-deep-dive">Worldcoin Merkle root</Anchor>, given
            a leaf index. The leaf index is an integer between 0 and 813508 that specifies a leaf node in the Merkle
            tree.
          </Text>
          <Text color="white">
            Clients must perform a one-time setup that uploads about 5 MB of data. This setup is independent of the
            state of the Merkle tree and only needs to be done once per client. Subsequent queries are fast and download
            less than 200 KB.
          </Text>
          <Text color="white">
            Our data is current as of <Anchor href="https://polygonscan.com/block/40090210">block 40090210</Anchor>, and
            you can see the Merkle root we use on chain in{' '}
            <Anchor href="https://polygonscan.com/tx/0xd06d693aed8f1716801b2da3530a77aab551df0b4e948ead79ffab8e85937810#eventlog:~:text=205aff5d8fc468b111f6fba374f5ba3bdaf02b37a741fd675fac334350f19880">
              this transaction
            </Anchor>{' '}
            to the "semaphore.wld.eth" contract.
          </Text>
          <Text maw={650}>
            <MerkleLookup apiKey={readOnlyDefaultApiKey} />
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
