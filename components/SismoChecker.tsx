import { Bucket, Client } from '@blyss/sdk';
import { ActionIcon, Box, Collapse, Group, Loader, SimpleGrid, Stack, TextInput, Title, Tooltip } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import _ from 'lodash';
import { useEffect, useState } from 'react';

// Basic types
interface RawBadgeInfo {
  collectionId: string;
  image: string;
  name: string;
  description: string;
}

type BadgeInfo = {
  [network: string]: RawBadgeInfo;
};

type BadgeInfos = {
  [network: string]: RawBadgeInfo[];
};

// Actually performs the private retrieval
async function privateReadAccount(bucket: Bucket, account: string): Promise<string[]> {
  return await bucket.privateRead(account);
}

// Only gets called only on the first check
async function setup(apiKey: string): Promise<Bucket> {
  const client = new Client(apiKey);
  const bucketName = 'global.sismo-v1';
  const bucket = await client.connect(bucketName);

  return bucket;
}

// Displays a badge (quick hack)
function Badge({ id, info }: { id: string; info: BadgeInfo }) {
  let networks = Object.keys(info);
  let commonInfo = info[networks[0]];

  return (
    <>
      <Tooltip label={commonInfo.name}>
        <Box w={160} h={160}>
          <img src={commonInfo.image} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Tooltip>
    </>
  );
}

// Grab info on all badges
async function getBadgeInfos(): Promise<BadgeInfos> {
  let output: BadgeInfos = {};
  for (const network of ['polygon', 'gnosis', 'mainnet']) {
    let response = await (await fetch(`https://hub.sismo.io/badges/${network}`)).json();
    output[network] = (response as any).items;
  }

  return output;
}

// Collate the info on a badge on many networks
function extractBadgeInfo(badgeInfos: BadgeInfos, id: string): BadgeInfo {
  let output: BadgeInfo = {};
  let networks = Object.keys(badgeInfos);
  for (const network of networks) {
    let rawBadgeInfo = badgeInfos[network].find(x => x.collectionId.toString() === id);
    if (rawBadgeInfo !== undefined) {
      output[network] = rawBadgeInfo;
    }
  }
  return output;
}

function SismoChecker({ apiKey }: { apiKey: string }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<undefined | string[]>(undefined);
  const [bucketHandle, setBucketHandle] = useState<Bucket | undefined>();
  const [badgeInfos, setBadgeInfos] = useState<BadgeInfos | undefined>();

  // Download the badge information
  useEffect(() => {
    (async function () {
      if (!badgeInfos) setBadgeInfos(await getBadgeInfos());
    })();
  });

  // When clicked, connect to the bucket and make the private read
  let clickAction = async () => {
    setLoading(true);
    console.time('lookup');

    // Connect to the bucket
    let bucket = bucketHandle;
    if (!bucket) {
      bucket = await setup(apiKey);
      setBucketHandle(bucket);
    }

    // Make the private read
    const readResult = await privateReadAccount(bucket, value.toLowerCase());
    setResult(readResult);

    console.timeEnd('lookup');
    setLoading(false);
  };

  let resultMsg = null;
  if (result !== undefined) {
    resultMsg = (
      <Stack pt={48}>
        <Title order={3}>Eligible badges</Title>
        <SimpleGrid cols={4}>
          {badgeInfos && result
            ? _.uniq(result).map((id: string, i: number) => {
                return <Badge key={i} id={id} info={extractBadgeInfo(badgeInfos, id)} />;
              })
            : null}
        </SimpleGrid>
      </Stack>
    );
  }

  return (
    <Stack w="100%">
      <form
        onSubmit={async e => {
          e.preventDefault();
          await clickAction();
        }}>
        <Group spacing="sm">
          <TextInput
            sx={{ flexGrow: 1 }}
            placeholder="e.g: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
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

export default SismoChecker;
