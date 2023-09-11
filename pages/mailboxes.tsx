import {
  Anchor,
  Box,
  Code,
  Container,
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

const MailboxUI = dynamic(() => import('../components/MailBox'), {
  ssr: false,
  loading: () => <Skeleton w={544} h={50} />
});

function Explainer() {
  const theme = useMantineTheme();
  return (
    <Flex direction={'column'} gap={20}>
      <Flex direction={'column'}>
        <Title order={1}>Private Message Exchange</Title>
        <Title order={2} style={{ color: theme.colors.blyssPink[6] }}>
          (using homomorphic encryption!)
        </Title>
      </Flex>
      <Text>
        Drop an encrypted message into any mailbox, and check your own to see if you've received any. The server can't
        read your messages, and it can't even see <i>who's messaging who</i> - this is a totally private exchange. This
        app is built on the <a href="https://blyss.dev">Blyss</a> protocol for fully homomorphic encryption;
        implementation details <a href="#faq">below</a>.
      </Text>
    </Flex>
  );
}

function Faq() {
  return (
    <div className="FAQ" id="faq">
      <h2>FAQ</h2>

      <h4>Why is this so ugly?</h4>
      <p>I'm still skinning it, check back tomorrow.</p>

      <h4>What is the metadata here, and why should I care about it?</h4>
      <p>
        In the context of messaging, metadata is "who's talking to who", and it can be just as sensitive as the message
        itself. For example, anti-abortion states use call logs to Planned Parenthood as evidence of intent, and
        oppressive regimes track down activists by tracing their contact patterns. Wiretapping for metadata is alive and
        well, even in the age of end-to-end encryption.
      </p>

      <h4>How is message metadata secured?</h4>
      <p>
        With the <Anchor href="https://blyss.dev">Blyss</Anchor> protocol, the server learns nothing at all about
        retrievals, not even the location the client is retrieving from. This sounds like an oxymoron for a conventional
        database - how can you fetch data without its address? - but is made possible by fully homomorphic encryption
        (FHE). The client encodes the location of the desired message as a one-hot vector of length N (to select one out
        of N total messages on the server), and encrypts that using an FHE scheme. The server performs a dot product
        between the encrypted vector and the database of all messages, producing an encrypted result that only the
        client can decrypt to get the message payload. <br></br>
        More detailed explainers on our use of FHE: a{' '}
        <a href="https://blintzbase.com/posts/pir-and-fhe-from-scratch/">blog post</a> we wrote, our{' '}
        <a href="https://github.com/blyssprivacy/sdk">source code</a>, and a{' '}
        <a href="https://eprint.iacr.org/2022/368">paper we published</a>.
      </p>

      <h4>Ok, but is this really homomorphic encryption? I thought that was really slow.</h4>
      <p>
        Yup, this is real-deal fully homomorphic encryption (FHE), running in your browser. We focused on the specific
        problem of private information retrieval, which allowed us to significantly optimize our FHE scheme. It's still
        slow compared to a plaintext database lookup, but we think it is now fast enough for some apps - we can serve
        gigabytes of data privately in under a second per query. Want to try using fast FHE in your own apps? Here's our{' '}
        <a href="https://github.com/blyssprivacy/sdk">open-source SDK!</a>
      </p>

      <h4>How are message contents secured?</h4>
      <p>
        To send a message addressed to mailbox <strong>M</strong>, the browser client first derives a key{' '}
        <code>
          <strong>K</strong> = PKBDF2(
          <strong>M</strong>)
        </code>
        , using a fixed salt. <strong>K</strong> is used by the client to AES encrypt the message; <strong>K</strong>{' '}
        never leaves your device. Of course, the server can't know <strong>M</strong>, so the client writes the
        encrypted message to server location{' '}
        <code>
          <strong>L</strong> = SHA256(<strong>M</strong>)
        </code>
        . Thus, the message is readable by people who know <strong>M</strong>.
      </p>

      <h4>Is this end-to-end encryption?</h4>
      <p>
        No. In this toy demo, your message contents are encrypted, but under a weak key that is merely derived from the
        destination's name - not something we'd ever call E2E. But the metadata of message retrievals is actually
        protected, so the server cannot know whom is messaging whom. Caveat: regardless of encryption strategy, patterns
        in client activity can always hint at client relationships, unless communicating parties take care to
        decorrelate their actions.
      </p>

      <h4>Could this be used as a metadata-private messenger?</h4>
      <p>
        With a couple more steps (starting with E2EE), maybe! If you're interested in this sort of thing, we should{' '}
        <a href="mailto:founders@blyss.dev">definitely talk</a>.
      </p>
    </div>
  );
}

export default function SSRPage() {
  const theme = useMantineTheme();

  return (
    <Container size={1172}>
      <Flex justify="flex-start" rowGap={50} align="flex-start" direction="column">
        <MenuBar />
        <Explainer />
        <MailboxUI />
        <Faq />
      </Flex>
    </Container>
  );
}
