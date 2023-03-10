import { Bucket, Client } from '@blyss/sdk';
import { Accordion, Affix, Button, Collapse, Group, Stack } from '@mantine/core';
import { IconArrowRight, IconTrash } from '@tabler/icons-react';
import _ from 'lodash';
import { useState } from 'react';

// Simple interface for data from the GraphQL API
// No need for anything fancier right now

export interface SismoBadge {
  id: string;
  groupGeneratorName: string;
  description: string;
  name: string;
  network: string;
  image: string;
  eligibility: {
    shortDescription: string;
    specification: string;
  };
  links: {
    label: string;
    logoUrl: string;
    url: string;
  }[];
  stats: {
    totalMintedBadges: number;
    totalGasFee: number;
  };
}

const badgeQuery: string = `query BadgeQuery {
  badges(where: {isCurated: true}) {
    id
    groupGeneratorName
    description
    name
    network
    image
    eligibility {
      shortDescription
      specification
    }
    links {
      label
      logoUrl
      url
    }
    stats {
      totalMintedBadges
      totalGasFee
    }
  }
}`;

// Gets called only on the first write
async function setup(apiKey: string): Promise<Bucket> {
  const client = new Client(apiKey);
  const bucketName = 'global.sismo-v1';

  if (!(await client.exists(bucketName))) {
    console.log('creating bucket...');
    await client.create(bucketName, true, {
      keyStoragePolicy: 'bloom'
    });
  }

  const bucket = await client.connect(bucketName);

  return bucket;
}

async function getJSON(url: string): Promise<any> {
  let response = await fetch(url);
  return await response.json();
}

// Loads information about the badges from Sismo
async function loadBadgeInfo(): Promise<SismoBadge[]> {
  let response = await fetch('https://api.sismo.io', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: badgeQuery })
  });

  return (await response.json()).data.badges as SismoBadge[];
}

// Mapping from account address to a list of badge id's that
// this account is eligible for.
type AccountGroupData = { [account: string]: string[] };

// Loads the account group data (which accounts are eligible for which groups) from Sismo
async function loadAccountGroupData(): Promise<AccountGroupData> {
  let output: AccountGroupData = {};

  const groupUrl = 'https://hub.sismo.io/groups/latests';
  let groupInfos = (await getJSON(groupUrl)).items;

  let badgeInfos = await loadBadgeInfo();
  for (const badgeInfo of badgeInfos) {
    let generatorName = badgeInfo.groupGeneratorName;

    let groupInfo = _.find(groupInfos, { name: generatorName });
    if (groupInfo === undefined) {
      // fall back to looking for latest generated by the target generator
      // TOOD: there is probably a nicer way to get the group ID for a given badge?
      groupInfo = _.maxBy(_.filter(groupInfos, { generatedBy: generatorName }), x => x.timestamp);
      if (groupInfo === undefined) {
        console.log("didn't find group info for:", generatorName);
        continue;
      }
    }

    let groupData: { [account: string]: string } = await getJSON(groupInfo.dataUrl);
    for (const accountId of Object.keys(groupData)) {
      if (!output.hasOwnProperty(accountId)) output[accountId] = [];
      output[accountId].push(badgeInfo.id);
    }
  }

  console.log(`output had ${Object.keys(output).length} keys`);

  return output;
}

// Write all data to the bucket
async function writeAllData(bucket: Bucket, accountGroupData: AccountGroupData): Promise<void> {
  let accounts = Object.keys(accountGroupData);
  console.log('accounts:', accounts.length);
  const batchSz = 10000;
  for (let i = 0; i < accounts.length; i += batchSz) {
    let chunk: AccountGroupData = {};
    for (let j = 0; j < Math.min(batchSz, accounts.length - i); j++) {
      let key = accounts[j];
      chunk[key] = accountGroupData[key];
    }
    console.log(chunk);
    await bucket.write(chunk);
  }
}

// Load all the data from Sismo, and then write it to the bucket
async function syncFromSismoToBucket(bucket: Bucket): Promise<any> {
  console.time('loadAccountGroupData');
  let accountGroupData = await loadAccountGroupData();
  console.timeEnd('loadAccountGroupData');

  console.time('write');
  await writeAllData(bucket, accountGroupData);
  console.timeEnd('write');

  return {
    loadedAccounts: Object.keys(accountGroupData).length,
    bucketName: bucket.name
  };
}

function SismoWriter({ apiKey }: { apiKey: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [bucketHandle, setBucketHandle] = useState<Bucket | undefined>();

  let syncAction = async () => {
    setLoading('sync');

    let bucket = bucketHandle;
    if (!bucket) {
      bucket = await setup(apiKey);
      setBucketHandle(bucket);
    }

    let result = await syncFromSismoToBucket(bucket);
    setResult(result);

    setLoading(null);
  };

  let deleteAction = async () => {
    setLoading('delete');

    let bucket = bucketHandle;
    if (!bucket) {
      bucket = await setup(apiKey);
      setBucketHandle(bucket);
    }

    await bucket.destroyEntireBucket();

    setLoading(null);
  };

  let resultMsg = null;
  if (result !== null) {
    resultMsg = <code>{JSON.stringify(result)}</code>;
  }

  return (
    <Stack>
      <Group>
        <Button
          disabled={apiKey.length === 0}
          size="lg"
          color="indigo"
          loading={loading === 'sync'}
          rightIcon={<IconArrowRight stroke={1.5} />}
          onClick={syncAction}
          loaderPosition="right">
          Sync all data
        </Button>
        <Collapse in={!loading}>{resultMsg}</Collapse>
      </Group>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Accordion variant="separated">
          <Accordion.Item value="customization">
            <Accordion.Control>Danger Zone</Accordion.Control>
            <Accordion.Panel>
              <Button
                disabled={apiKey.length === 0}
                size="sm"
                color="red"
                loading={loading === 'delete'}
                rightIcon={<IconTrash stroke={1.5} />}
                onClick={deleteAction}
                loaderPosition="right">
                Delete all data
              </Button>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Affix>
    </Stack>
  );
}

export default SismoWriter;
