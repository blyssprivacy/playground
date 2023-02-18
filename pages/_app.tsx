import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Analytics } from '@vercel/analytics/react';
import theme from '../components/theme';
import { ColorScheme, MantineProvider } from '@mantine/core';

import Layout from '../components/Layout';

import '../styles/globals.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <UserProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </MantineProvider>
    </UserProvider>
  );
}
