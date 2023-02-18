import {
  Anchor,
  Box,
  Code,
  Divider,
  Flex,
  FlexProps,
  Group,
  List,
  SimpleGrid,
  Skeleton,
  Spoiler,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { IconArrowDown, IconArrowRight, IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import MenuBar from '../components/MenuBar';

const PasswordChecker = dynamic(() => import('../components/PasswordChecker'), {
  ssr: false,
  loading: () => <Skeleton w={544} h={50} />
});

const API_ROOT = 'https://beta.api.blyss.dev';
const EXAMPLE_DIM = 4;
const EXAMPLE_ELEMS = EXAMPLE_DIM * EXAMPLE_DIM;
const EXAMPLE_DB = [
  1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0,
  1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1
];

function Explainer({ children }: { children: React.ReactNode }) {
  return <Text color="gray.6">{children}</Text>;
}

function Chip(props: FlexProps) {
  return <Flex align="center" justify="center" h={24} w={24} c="gray.1" {...props} />;
}

function getNthBit(bytes: Uint8Array, i: number): number {
  let isOne = (bytes[Math.floor(i / 8)] & (1 << i % 8)) === 0;
  return isOne ? 1 : 0;
}

function GarbledChip(props: FlexProps & { hash: string; idxBase: number; active?: boolean }) {
  let { hash, active, idxBase, ...restProps } = props;
  let bytes = hexToBytes(props.hash);
  let data = Array.apply(0, new Array(16)).map((_, i) => {
    return getNthBit(bytes, props.idxBase * 16 + i);
  });
  let colors = ['gray.8', 'gray.9'];
  if (props.active) colors = ['gray.8', 'gray.9'];
  return (
    <Chip {...restProps}>
      <SimpleGrid
        cols={4}
        spacing={0}
        sx={theme => ({
          outlineOffset: 4,
          outline: props.active ? '1px dashed ' + theme.colors.blue[8] : 'none'
        })}>
        {Array.apply(0, new Array(16)).map((_, i) => {
          let bit = data[i] === 1;
          return <Box key={i} w={6} h={6} bg={bit ? colors[0] : colors[1]}></Box>;
        })}
      </SimpleGrid>
      {props.children}
    </Chip>
  );
}

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function hexToBytes(hex: string): Uint8Array {
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.slice(c, c + 2), 16));
  return new Uint8Array(bytes);
}

function hexToBinary(hex: string): string {
  let out = '';
  for (let i = 0; i < hex.length; i += 2) {
    out += parseInt(hex.slice(i, i + 2), 16)
      .toString(2)
      .padStart(8, '0');
  }
  return out;
}

function getCoordinates(hashHex: string) {
  const hashArray = hexToBytes(hashHex);
  let row = hashArray[2] % EXAMPLE_DIM;
  let col = hashArray[3] % EXAMPLE_DIM;
  return { row, col };
  // return `(${row}, ${col})`;
}

function indexMatchesCoords(i: number, coords: { row: number; col: number }): boolean {
  return Math.floor(i / EXAMPLE_DIM) === coords.row && i % EXAMPLE_DIM === coords.col;
}

export default function SSRPage() {
  const [pass, setPass] = useState('');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    (async () => {
      let hashedPass = await digestMessage(pass);
      setHash(hashedPass);
    })();
  }, [pass]);

  let coords = getCoordinates(hash);
  let idxMsg = `${coords.row * EXAMPLE_DIM + coords.col}`;
  // let coordsMsg = idxMsg + ` → (${coords.row}, ${coords.col})`;
  let coordsMsg = `(row ${coords.row}, column ${coords.col})`;

  let binStr = hexToBinary(hash);
  let binIdx = parseInt(binStr.slice(0, 2), 2);

  const clickAction = () => {
    setLoading(true);
  };

  return (
    <>
      <MenuBar href="https://blyss.dev" />
      <Stack mt={128} fz="lg">
        <Stack maw={780}>
          <Title order={1} color="white">
            The
            <Text inherit component="span" color="blyssPink" fs="italic" ml={8} mr={4}>
              private
            </Text>{' '}
            password checker.
          </Title>
          <Text color="white">
            Services like "Have I Been Pwned?" let you check whether your password has recently appeared in a breach.
            However, in performing the check, they{' '}
            <Anchor href="https://cablej.io/blog/k-anonymity/">learn information about your password</Anchor>.
          </Text>
          <Text color="white">
            The Blyss password checker uses{' '}
            <Anchor href="https://cablej.io/blog/k-anonymity/">homomorphic encryption</Anchor> to keep your password
            completely private. Nobody can learn <strong>any</strong> information about your password, not even our
            servers.
          </Text>
        </Stack>
        {/* <Text color="white">
          We check your password against all{' '}
          <Anchor href="">~1 billion passwords in the 2021 "Have I Been Pwned" dataset</Anchor>.
        </Text> */}

        <Stack mt={24} maw={1000}>
          <Flex w="100%" wrap="wrap" rowGap={48} columnGap={24}>
            <Flex w="100%" justify="flex-start" sx={{ flexGrow: 1 }}>
              <PasswordChecker value={pass} onChange={e => setPass(e.target.value)} />
              {/* <Group w="100%" maw={600} spacing="sm">
                <PasswordInput
                  sx={{ flexGrow: 1 }}
                  placeholder="Password to check"
                  autoComplete="new-password"
                  size="lg"
                  value={pass}
                  onChange={e => setPass(e.target.value)}></PasswordInput>

                <ActionIcon size="xl">
                  {loading ? <Loader /> : <IconArrowRight stroke={1.5} size={32} onClick={clickAction} />}
                </ActionIcon>
              </Group> */}
            </Flex>

            <Spoiler
              transitionDuration={800}
              w="100%"
              maxHeight={showExplanation ? 100000 : 0}
              hideLabel={
                <>
                  Read less
                  <Box display="inline-block" pl={4} pos="relative" top={2}>
                    <IconChevronUp size={14} />
                  </Box>
                </>
              }
              showLabel={
                <>
                  See how it works
                  <Box display="inline-block" pl={4} pos="relative" top={2}>
                    <IconChevronDown size={14} />
                  </Box>
                </>
              }
              pb={32}>
              <Flex w="100%" wrap="wrap" rowGap={48} columnGap={24}>
                <Box w={400} sx={{ textAlign: 'left', flexGrow: 1 }}>
                  <Stack>
                    <Explainer>
                      The client starts by hashing the password. If we sent this directly to the server, it{' '}
                      <Anchor>could learn the password</Anchor>.
                    </Explainer>
                  </Stack>
                </Box>
                <Box w="40%" sx={{ flexGrow: 1 }}>
                  <Stack>
                    <Code bg="#1f2023" block fz={14} sx={{ textOverflow: 'ellipsis' }}>
                      {binStr}
                    </Code>
                  </Stack>
                </Box>
                <Box w={400} sx={{ textAlign: 'left', flexGrow: 1 }}>
                  <Stack>
                    <Explainer>
                      The breached passwords are stored on the server in a large (8 GB) hash table. Each row of the
                      table contains all of the password hashes starting with some hash prefix, like{' '}
                      <Code mr={4} ml={2} bg="blue.8">
                        {binStr.slice(0, 2)}...
                      </Code>
                      .
                    </Explainer>
                    <Explainer>
                      To check if a password is in the hash table, the client must:
                      <List withPadding type="ordered" pt={12} fz="inherit" c="inherit">
                        <List.Item>
                          Download the{' '}
                          <Box
                            component="span"
                            mr={4}
                            ml={2}
                            px={4}
                            sx={{ outline: '1px dashed ' + theme.colors.blue[8], outlineOffset: 0 }}>
                            row
                          </Box>
                          {/* <Text inherit fw="bold" color="blue.8" component="strong">
                        row
                      </Text>{' '} */}
                          corresponding <br />
                          to the password's hash prefix from the server.
                        </List.Item>
                        <List.Item>Check if the password is in the downloaded row.</List.Item>
                      </List>
                    </Explainer>
                    <Explainer>
                      It's important that the server not learn which row we retrieve, since this would reveal
                      information about our password.
                    </Explainer>
                    {/* <Explainer>Now, we want to 'target' the particular bit at our coordinates.</Explainer> */}
                    {/* <Explainer>
                  Next, we use the hash to derive a location in a{' '}
                  <Anchor href="https://hur.st/bloomfilter/">Bloom filter</Anchor>. A Bloom filter is a big matrix of
                  bits that allows you to efficiently check if items are contained in a set. To test if an item is
                  inside a Bloom filter, you derive several locations in the filter, and check if they are all set to{' '}
                  <code>1</code>.
                </Explainer>
                <Explainer>
                  Normally, we would just download this Bloom filter, and then test the bits locally. Unfortunately,
                  since there are almost <Anchor>one billion breached passwords</Anchor>, the Bloom filter is 8 GB, so
                  it's too large to download.
                </Explainer>
                <Explainer>
                  Instead, we need to <em>privately</em> check the bits in the Bloom filter.
                </Explainer>
                <Explainer>
                  We encode the location in the matrix as two "one-hot" vectors. Basically, each vector is all
                  <Box display="inline-block" mx={4}>
                    <Chip bg="gray.7">0</Chip>
                  </Box>
                  except for a single
                  <Box display="inline-block" mx={4}>
                    <Chip bg="blue.8">1</Chip>
                  </Box>
                  in the row or column corresponding to the location we are trying to read.
                </Explainer>
                <Explainer>
                  This encoding is definitely kind of redundant, but the next step will make it more clear why we use
                  it.
                </Explainer> */}
                  </Stack>
                </Box>
                <Box w="40%" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
                  <Stack w="100%">
                    <Stack ml={52} spacing={8}>
                      <Box ml={154}>
                        <Text color="inherit">Hash table</Text>
                      </Box>
                      <Stack spacing={36} align="flex-start">
                        <Group spacing={36}>
                          <Group align="flex-start" spacing={12}>
                            <Box w={64} ta="right" mr={16}>
                              {/* Hash prefix */}
                            </Box>
                            <Stack spacing={12} align="flex-start">
                              {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                                let active = i === binIdx;
                                let rightArrow = (
                                  <Box pos="absolute" sx={{ top: 0, left: 30, height: 24, width: 24 }}>
                                    <IconArrowRight color={theme.colors.blue[8]} />
                                  </Box>
                                ); // bg={active ? 'blue.8' : 'gray.7'}
                                let msg = Math.floor(i / 2) + '' + (i % 2) + '...';
                                return (
                                  <Chip bg="none" pos="relative" key={i}>
                                    <Code bg={active ? 'blue.8' : 'none'}>{msg}</Code>
                                    {/* {active ? rightArrow : null} */}
                                  </Chip>
                                );
                              })}
                            </Stack>
                          </Group>
                          <Stack spacing={4}>
                            {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                              let isTarget = i === binIdx;

                              return (
                                <Group
                                  key={i}
                                  spacing={12}
                                  sx={{ border: isTarget ? '1px dashed ' + theme.colors.blue[8] : 'none' }}
                                  p={4}>
                                  {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, j) => {
                                    let color = 'gray.8';
                                    let bit = EXAMPLE_DB[i * EXAMPLE_DIM + j];
                                    if (bit === 0) color = 'gray.7';
                                    return (
                                      <Flex
                                        key={j}
                                        align="center"
                                        justify="center"
                                        bg={color}
                                        h={24}
                                        w={24}
                                        p={2}
                                        c="gray.1">
                                        {/* {isTarget ? <IconFocus2 strokeWidth={1.5} /> : ''} */}
                                      </Flex>
                                    );
                                  })}
                                </Group>
                              );
                            })}
                          </Stack>
                        </Group>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>

                <Box w={400} sx={{ textAlign: 'left', flexGrow: 1 }} pt={48}>
                  <Stack>
                    <Explainer>
                      The client uses{' '}
                      <Anchor href="https://en.wikipedia.org/wiki/Homomorphic_encryption">
                        homomorphic encryption
                      </Anchor>{' '}
                      to retrieve the desired row, completely privately.
                    </Explainer>
                    <Explainer>
                      The client encrypts a big "one-hot" vector of bits. Specifically, the bits are all
                      <Box display="inline-block" mx={4}>
                        <Chip bg="gray.7">0</Chip>
                      </Box>
                      except for a single
                      <Box display="inline-block" mx={4}>
                        <Chip bg="blue.8">1</Chip>
                      </Box>
                      corresponding to the row it is trying to retrieve.
                    </Explainer>
                    <Explainer>
                      The client sends the encrypted bits to the server. Just like with normal encryption, to the
                      server, the encrypted bits just look like random garbage; only the client knows which one is an
                      encrypted 1.
                    </Explainer>
                    <Explainer>
                      The magic of homomorphic encryption is that, even though the encrypted bits look like garbage to
                      the server, it can still <Anchor>do something useful with them</Anchor>. Let's see how.
                    </Explainer>
                  </Stack>
                </Box>
                <Box w="40%" sx={{ flexGrow: 1 }} pt={48}>
                  <Stack spacing={64}>
                    <Stack spacing={8}>
                      <Group spacing={0} align="stretch" position="center">
                        <Flex ta="right" pr={24} justify="flex-end">
                          <Box maw={120}>One-hot vector of bits</Box>
                        </Flex>
                        <Stack spacing={12} align="flex-start">
                          {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                            let active = i === binIdx;
                            return (
                              <Chip key={i} bg={active ? 'blue.8' : 'gray.7'} pos="relative">
                                {active ? 1 : 0}
                              </Chip>
                            );
                          })}
                        </Stack>
                        <Flex w={64}>
                          <Flex align="center" justify="center" sx={{ flexGrow: 1 }}>
                            <IconArrowRight color={theme.colors.gray[6]} />
                          </Flex>
                        </Flex>
                        <Stack spacing={12} align="flex-start">
                          {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                            let active = i === binIdx;
                            return (
                              <GarbledChip key={i} idxBase={i} hash={hash} pos="relative" active={active}></GarbledChip>
                            );
                          })}
                        </Stack>
                        <Box ta="left" pl={24}>
                          Encrypted bits
                        </Box>
                      </Group>
                    </Stack>
                  </Stack>
                </Box>

                <Box w="100%" pos="relative" mb={24}>
                  <Box pos="absolute" sx={{ fontStyle: 'italic', textAlign: 'right', right: 0, bottom: 6 }}>
                    {/* Client */}
                  </Box>
                  <Box pos="absolute" sx={{ fontStyle: 'italic', textAlign: 'left', left: 0, top: 6 }}>
                    Server
                  </Box>
                  <Divider w="100%" h={2}></Divider>
                </Box>

                <Flex w="100%" rowGap={48} columnGap={24} pos="relative">
                  {/* <Box
                pos="absolute"
                w="100%"
                h="100%"
                sx={{ outline: '1px dotted' + theme.colors.gray[4], outlineOffset: 32 }}></Box> */}
                  <Box w={400} sx={{ textAlign: 'left', flexGrow: 1 }}>
                    <Stack>
                      <Explainer>
                        The server has the full hash table, and receives a vector of homomorphically encrypted bits.
                      </Explainer>
                      <Explainer>
                        Homomorphic encryption lets the server{' '}
                        <Anchor>multiply the encrypted bits by data in the table</Anchor>!
                      </Explainer>
                      <Explainer>
                        The result <em>still</em> looks like garbage to the server, but the client can decrypt it and
                        get the result of the multiplication.
                      </Explainer>
                      {/* <Explainer>

                      </Explainer> */}
                    </Stack>
                  </Box>
                  <Box w="40%" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <Stack w="100%">
                      <Stack ml={16} spacing={8}>
                        <Box ml={192}>
                          <Text color="inherit">Hash table</Text>
                        </Box>
                        <Stack spacing={36} align="flex-start">
                          <Group spacing={36}>
                            <Group align="flex-start" spacing={12}>
                              <Text maw={128}>Encrypted bits</Text>
                              <Stack spacing={12} align="flex-start">
                                {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                                  let active = i === binIdx;
                                  let rightArrow = (
                                    <Box pos="absolute" sx={{ top: 0, left: 30, height: 24, width: 24 }}>
                                      <IconX color={theme.colors.gray[6]} />
                                    </Box>
                                  );
                                  return (
                                    <GarbledChip key={i} idxBase={i} hash={hash} active={active} pos="relative">
                                      {rightArrow}
                                    </GarbledChip>
                                  );
                                })}
                              </Stack>
                            </Group>
                            <Stack spacing={4}>
                              {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                                let isTarget = i === binIdx;

                                return (
                                  <Group
                                    key={i}
                                    spacing={12}
                                    sx={{ border: isTarget ? '1px dashed ' + theme.colors.blue[8] : 'none' }}
                                    p={4}>
                                    {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, j) => {
                                      let color = 'gray.8';
                                      let bit = EXAMPLE_DB[i * EXAMPLE_DIM + j];
                                      if (bit === 0) color = 'gray.7';
                                      return (
                                        <Flex
                                          key={j}
                                          align="center"
                                          justify="center"
                                          bg={color}
                                          h={24}
                                          w={24}
                                          p={2}
                                          c="gray.1">
                                          {/* {isTarget ? <IconFocus2 strokeWidth={1.5} /> : ''} */}
                                        </Flex>
                                      );
                                    })}
                                  </Group>
                                );
                              })}
                            </Stack>
                          </Group>
                          <Stack ml={194} spacing={8}>
                            <Group spacing={12} align="flex-start" pos="relative">
                              <Box pos="absolute" sx={{ left: 53.5, top: -30, height: 24, width: 24 }}>
                                <IconArrowDown color={theme.colors.gray[6]} />
                              </Box>
                              {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                                return (
                                  <GarbledChip key={i} hash={hash} idxBase={i + EXAMPLE_DIM} bg="gray.7"></GarbledChip>
                                );
                              })}
                            </Group>
                            <Group>Encrypted row</Group>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Flex>

                <Box w="100%" pos="relative" mb={24}>
                  <Box pos="absolute" sx={{ fontStyle: 'italic', textAlign: 'right', right: 0, bottom: 6 }}>
                    {/* Server */}
                  </Box>
                  <Box pos="absolute" sx={{ fontStyle: 'italic', textAlign: 'left', left: 0, top: 6 }}>
                    Client
                  </Box>
                  <Divider w="100%" h={2}></Divider>
                </Box>

                <Box w={400} sx={{ textAlign: 'left', flexGrow: 1 }}>
                  <Stack pb={96}>
                    <Explainer>
                      Finally, the client decrypts the encrypted row, and checks if their password is present in the
                      row.
                    </Explainer>
                    <Explainer>
                      If the password is present, it has appeared in a data breach before, and you should stop using it.
                    </Explainer>
                  </Stack>
                </Box>
                <Box w="40%" sx={{ flexGrow: 1 }}>
                  <Stack ml={16}>
                    <Stack ml={194} spacing={8}>
                      <Group>Encrypted row</Group>
                      <Group spacing={12} align="flex-start" pos="relative">
                        {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, i) => {
                          return <GarbledChip key={i} hash={hash} idxBase={i + EXAMPLE_DIM} bg="gray.7"></GarbledChip>;
                        })}
                        <Box pos="absolute" sx={{ left: 53.5, top: 30, height: 24, width: 24 }}>
                          <IconArrowDown color={theme.colors.gray[6]} />
                        </Box>
                      </Group>
                      <Group>
                        <Group
                          mt={28}
                          spacing={12}
                          sx={{ outline: '1px dashed ' + theme.colors.blue[8], outlineOffset: 4 }}>
                          {Array.apply(0, new Array(EXAMPLE_DIM)).map((_, j) => {
                            let color = 'gray.8';
                            let bit = EXAMPLE_DB[binIdx * EXAMPLE_DIM + j];
                            if (bit === 0) color = 'gray.7';
                            return (
                              <Flex key={j} align="center" justify="center" bg={color} h={24} w={24} p={2} c="gray.1">
                                {/* {isTarget ? <IconFocus2 strokeWidth={1.5} /> : ''} */}
                              </Flex>
                            );
                          })}
                        </Group>
                      </Group>
                      <Group>Decrypted row</Group>
                    </Stack>
                  </Stack>
                </Box>
              </Flex>
            </Spoiler>
          </Flex>
        </Stack>
      </Stack>
    </>
  );
}
