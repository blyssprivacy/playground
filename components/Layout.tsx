import React, { ReactNode } from 'react';
import Head from 'next/head';

import MenuBar from './MenuBar';
import { Box, Container, MediaQuery } from '@mantine/core';

const Layout = ({ children }: { children: ReactNode }) => (
  <Box>
    <Head>
      <title>Blyss Console</title>
      <link rel="icon" type="image/png" href="/favicon-180.png" />
    </Head>
    <Box component="main">
      <MediaQuery smallerThan="lg" styles={{ padding: '0 20px' }}>
        <Box>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              minHeight: '100vh',
              backgroundImage:
                'url(https://uploads-ssl.webflow.com/63d8ac00ce3d18d372386468/63e12a7c107b4a72135ecfde_privacy-bg.svg)',
              backgroundPosition: '50% 0%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              transform: 'scaleX(-1)',
              zIndex: -1,
              top: 0,
              left: 0
            }}></Box>
          <Box sx={{ maxWidth: 1172, paddingTop: 20, margin: 'auto' }}>{children}</Box>
        </Box>
      </MediaQuery>
    </Box>
  </Box>
);

export default Layout;
