import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import theme from '../components/theme';

import Layout from '../components/Layout';

import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ClerkProvider {...pageProps}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ClerkProvider>
    </MantineProvider>
  );
}
