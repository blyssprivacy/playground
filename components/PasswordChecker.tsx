import { Group, PasswordInput, ActionIcon, Loader, Stack, Box, Alert, Anchor } from '@mantine/core';
import { IconAlertCircle, IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import React, { ChangeEvent, useState } from 'react';
import { Bucket, Client } from '@blyss/sdk';

// This function gets called only on the first check
async function setup(): Promise<Bucket> {
  const client = new Client({
    // This is a "read-only" API key, so safe to distribute
    apiKey: 'Ev2PIiwkcvaIbE89BQU3s6YWU5dIm3Bd2qWJrSkm',
    endpoint: 'https://dev.api.blyss.dev'
  });
  const bucketName = 'global.hibp';
  const bucket = await client.connect(bucketName);

  return bucket;
}

// This function performs the check
async function privateCheck(bucket: Bucket, password: string): Promise<boolean> {
  return await bucket.checkInclusion(password);
}

function PasswordChecker({ value, onChange }: { value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<undefined | boolean>(undefined);
  const [bucketHandle, setBucketHandle] = useState<Bucket | undefined>();

  let clickAction = async () => {
    setLoading(true);

    let bucket = bucketHandle;
    if (!bucket) {
      bucket = await setup();
      setBucketHandle(bucket);
    }

    const checkResult = await privateCheck(bucket, value);
    setResult(checkResult);

    setLoading(false);
  };

  let resultMsg = null;
  if (result !== undefined) {
    if (result) {
      resultMsg = (
        <Alert icon={<IconAlertCircle size={16} />} title="Bad news - this password was found in a breach!" color="red">
          Your password was found in the
          <Anchor href="https://haveibeenpwned.com/Passwords">2021 "Have I Been Pwned" list</Anchor>
          of compromised passwords. You should not use it going forward, and change it on any sites you currently use it
          on.
        </Alert>
      );
    } else {
      resultMsg = (
        <Alert
          icon={<IconCircleCheck size={16} />}
          title="Good news - this password was not found in the set of breached passwords."
          color="green">
          Your password was <strong>not</strong> found in the 2021 "Have I Been Pwned" list of compromised passwords.
        </Alert>
      );
    }
  }

  return (
    <Stack w="100%" maw={600}>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await clickAction();
        }}>
        <Group spacing="sm">
          <PasswordInput
            sx={{ flexGrow: 1 }}
            placeholder="Password to check"
            autoComplete="new-password"
            size="lg"
            disabled={loading}
            value={value}
            onChange={onChange}></PasswordInput>

          <ActionIcon size="xl">
            {loading ? <Loader /> : <IconArrowRight stroke={1.5} size={32} onClick={clickAction} />}
          </ActionIcon>
        </Group>
      </form>
      <Box>{resultMsg}</Box>
    </Stack>
  );
}

export default PasswordChecker;
