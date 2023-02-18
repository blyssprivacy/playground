import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Table,
  Tooltip,
  Text,
  CopyButton,
  ActionIcon,
  Stack,
  Spoiler,
  Flex
} from '@mantine/core';
import { IconCheck, IconCopy, IconQuestionCircle } from '@tabler/icons-react';

export interface Permission {
  bucket_name: string;
  access_level: string;
}

export interface ApiKeyData {
  uid?: string;
  secret?: string;
  permissions?: Permission[];
}

function Permissions({ permissions }: { permissions?: Permission[] }) {
  if (!permissions || permissions.length === 0) {
    return (
      <tr>
        <td colSpan={2}>
          <Text color="dark.3" align="center">
            This API key is not yet associated with any buckets.
          </Text>
        </td>
      </tr>
    );
  }

  return (
    <>
      {permissions.map(permission => (
        <tr key={permission.bucket_name}>
          <td>{permission.bucket_name}</td>
          <td style={{ textTransform: 'uppercase' }}>{permission.access_level}</td>
        </tr>
      ))}
    </>
  );
}

function ApiKey({ data }: { data: ApiKeyData }) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder w={400}>
      <Stack spacing="xl" p={0}>
        <Group position="apart">
          <Text weight={500} ff="'Source Code Pro', monospace" fz={12}>
            {data.secret}
          </Text>
          <CopyButton value={data.secret!} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} color={copied ? 'teal' : 'gray'} position="left" withArrow>
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? <IconCheck size={16} strokeWidth={1} /> : <IconCopy size={16} strokeWidth={1} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
        {data.permissions && data.permissions.length > 0 ? (
          <Spoiler
            maxHeight={200}
            showLabel="Show more"
            styles={theme => ({ control: { color: theme.colors.gray[3], paddingTop: 8 } })}
            hideLabel="Hide">
            <Table verticalSpacing={4} horizontalSpacing={0}>
              <thead>
                <tr>
                  <th>Bucket</th>
                  <th>Access level</th>
                </tr>
              </thead>
              <tbody>
                <Permissions permissions={data.permissions} />
              </tbody>
            </Table>
          </Spoiler>
        ) : null}
      </Stack>
    </Card>
  );
}

const colorMap: any = {
  read: 'teal',
  write: 'orange',
  admin: 'red'
};

export default function ApiKeys({ apiKeys }: { apiKeys: ApiKeyData[] }) {
  // return (
  //   <ApiKey
  //     data={{
  //       uid: 'fsadfsadfsadfsadfsdgdfsg',
  //       secret: 'Ev2PIiwkCVaIbE89BQU3t6YWU5dIm3Bd2qWJrSkm',
  //       permissions: [{ bucket_name: 'simple-bucket', access_level: 'read' }]
  //     }}
  //   />
  // );
  return (
    <Flex gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
      {apiKeys.map(a => {
        return <ApiKey key={a.uid} data={a} />;
      })}
    </Flex>
  );
}
