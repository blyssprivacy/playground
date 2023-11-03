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

const lookupCfg = {
  subtreeHeight: 4,
  capHeight: 11,
  treeHeight: 21
};

// Get the keys we will need to fetch from buckets to construct the proof
function getSubtrees(identityIdx: number): string[] {
  const keysToFetch = [];
  let curLevel = lookupCfg.treeHeight - lookupCfg.subtreeHeight;
  while (curLevel >= lookupCfg.capHeight) {
    let idxWithinLevel = identityIdx >> (lookupCfg.treeHeight - 1 - curLevel);
    let key = `${curLevel}-${idxWithinLevel}`;
    keysToFetch.push(key);

    if (curLevel >= lookupCfg.subtreeHeight) {
      curLevel -= lookupCfg.subtreeHeight - 1;
    } else {
      break;
    }
  }
  console.log(keysToFetch);
  return keysToFetch;
}

interface ProofStep {
  value: string;
  pos: number;
}
function getProof(tree: string[], treeHeight: number, idx: number): ProofStep[] {
  let out = [];
  for (let level = 1; level < treeHeight; level++) {
    let idxWithinLevel = idx >> (treeHeight - 1 - level);
    console.log('level', level, 'idx', idxWithinLevel);
    idxWithinLevel ^= 1; // flip low bit to get sibiling

    let treeIdx = (1 << level) - 1 + idxWithinLevel;
    out.push({ value: tree[treeIdx], pos: idxWithinLevel & 1 });
  }
  out.reverse();
  return out;
}

// Construct the Merkle proof from subtrees
function constructMerkleProof(identityIdx: number, subtrees: string[][]) {
  let curLevel = lookupCfg.treeHeight - lookupCfg.subtreeHeight;
  let outerIdx = 0;

  let proof: ProofStep[] = [];
  while (curLevel >= lookupCfg.capHeight) {
    let subtree = subtrees[outerIdx++];
    let idxWithinLevel = identityIdx >> (lookupCfg.treeHeight - 1 - curLevel);
    let idxWithinSubtree =
      (identityIdx >> (lookupCfg.treeHeight - 1 - (curLevel + lookupCfg.subtreeHeight - 1))) -
      idxWithinLevel * (1 << (lookupCfg.subtreeHeight - 1));

    let proofPart = getProof(subtree, lookupCfg.subtreeHeight, idxWithinSubtree);
    proof = proof.concat(proofPart);

    if (curLevel >= lookupCfg.subtreeHeight) {
      curLevel -= lookupCfg.subtreeHeight - 1;
    } else {
      break;
    }
  }

  return proof;
}

// Perform the the private retrievals, and construct the Merkle proof
async function privateGetMerkleProof(bucket: Bucket, cap: string[], identityIdx: number): Promise<string> {
  let subtreesToQuery = getSubtrees(identityIdx);
  let subtrees = await Promise.all(
    subtreesToQuery.map(async key => {
      return await bucket.privateRead(key);
    })
  );
  console.log(subtrees);

  let proof = constructMerkleProof(identityIdx, subtrees);
  let capProofPart = getProof(cap, lookupCfg.capHeight, identityIdx >> (lookupCfg.treeHeight - lookupCfg.capHeight));
  proof = proof.concat(capProofPart);

  return JSON.stringify(proof, null, 2);
}

// Only gets called only on the first check
async function setup(apiKey: string): Promise<Bucket> {
  const client = new Client({
    apiKey,
    endpoint: 'https://dev.api.blyss.dev'
  });
  const bucketName = 'global.wc-v3';
  const secretSeed = attemptGetLocalStorage('blyss.secretSeed');
  const bucket = await client.connect(bucketName, secretSeed);
  attemptSetLocalStorage('blyss.secretSeed', bucket.toSecretSeed());

  return bucket;
}

const CAP_URL = 'https://blyss-hints.s3.us-east-2.amazonaws.com/wc-cap.json';

// Fetches the Merkle tree's "cap" (top rows)
async function getCap(): Promise<string[]> {
  return (await (await fetch(CAP_URL)).json()) as string[];
}

function MerkleLookup({ apiKey }: { apiKey: string }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const [didSetup, setDidSetup] = useState(false);
  const [result, setResult] = useState<undefined | string>(undefined);
  const [bucketHandle, setBucketHandle] = useState<Bucket | undefined>();
  const [cap, setCap] = useState<string[] | undefined>();

  // Download the Merkle cap
  useEffect(() => {
    (async function () {
      if (!cap) setCap(await getCap());
    })();
  });

  let setupAction = async () => {
    setSetupLoading(true);

    let bucket = await setup(apiKey);
    let publicUUID = attemptGetLocalStorage('blyss.publicUUID');
    await bucket.setup(publicUUID);
    attemptSetLocalStorage('blyss.publicUUID', bucket.uuid);

    setBucketHandle(bucket);
    setSetupLoading(false);
    setDidSetup(true);
  };

  // When clicked, connect to the bucket and make the private read
  let clickAction = async () => {
    if (isNaN(parseFloat(value)) || parseFloat(value) >= 1 << (lookupCfg.treeHeight - 1)) return;

    setLoading(true);
    console.time('lookup');

    // Make the private read
    const readResult = await privateGetMerkleProof(bucketHandle!, cap!, parseInt(value));
    setResult(readResult);

    console.timeEnd('lookup');
    setLoading(false);
  };

  let resultMsg = null;
  if (result !== undefined) {
    resultMsg = (
      <Stack pt={48}>
        <Title order={3}>Merkle proof of inclusion</Title>
        <Code block>{result}</Code>
      </Stack>
    );
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
            placeholder="Leaf index (0 to 800000)"
            size="lg"
            disabled={loading}
            value={value}
            onChange={e => setValue(e.target.value)}></TextInput>

          <ActionIcon size="xl">
            {loading ? <Loader /> : <IconArrowRight stroke={1.5} size={32} onClick={clickAction} />}
          </ActionIcon>
        </Group>
      </form>
      <Collapse in={!loading}>{resultMsg}</Collapse>
    </Stack>
  );
}

export default MerkleLookup;
