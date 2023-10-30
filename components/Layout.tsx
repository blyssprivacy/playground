import Head from 'next/head';
import { ReactNode } from 'react';

import { Box, Flex, MediaQuery } from '@mantine/core';

const Layout = ({ children }: { children: ReactNode }) => (
  <Box>
    <Head>
      <title>Blyss Playground</title>
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
                "url(\"data:image/svg+xml,%3Csvg width='2406' height='965' viewBox='0 0 2406 965' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_504_1550)'%3E%3Cg opacity='0.2' filter='url(%23filter0_f_504_1550)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M655.639 -94.1357C736.202 -104.517 824.148 -159.766 889.413 -111.501C956.485 -61.9008 970.904 41.786 947.619 121.788C927.522 190.837 831.543 195.876 784.179 250.06C728.834 313.375 738.013 438.441 655.639 455.811C574.112 473.004 508.239 385.304 458.221 318.797C415.66 262.205 401.221 192.472 404.43 121.788C407.468 54.8581 424.463 -14.4212 475.332 -58.1452C523.611 -99.6423 592.446 -85.993 655.639 -94.1357Z' fill='url(%23paint0_linear_504_1550)'/%3E%3C/g%3E%3Cg opacity='0.2' filter='url(%23filter1_f_504_1550)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2078.18 390.835C2098.53 467.394 2027.8 536.79 1972.58 593.586C1929.32 638.074 1868.92 649.802 1809.39 667.293C1742.42 686.966 1677.74 719.129 1610.64 699.924C1518.27 673.485 1394.42 639.78 1380.94 544.655C1367.36 448.885 1497.49 404.323 1558.03 328.886C1606.6 268.374 1619.48 166.42 1695.79 152.363C1771.77 138.364 1820.6 227.552 1886.16 268.436C1953.11 310.192 2057.91 314.573 2078.18 390.835Z' fill='url(%23paint1_linear_504_1550)'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_504_1550' x='104' y='-431' width='1154' height='1189' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='150' result='effect1_foregroundBlur_504_1550'/%3E%3C/filter%3E%3Cfilter id='filter1_f_504_1550' x='1079.95' y='-149.113' width='1301.81' height='1154.94' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='150' result='effect1_foregroundBlur_504_1550'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear_504_1550' x1='475.271' y1='18.086' x2='852.785' y2='342.867' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231C3329'/%3E%3Cstop offset='1' stop-color='%23D7F7E9' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_504_1550' x1='2068.11' y1='344.734' x2='1370.44' y2='498.647' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233F56AA'/%3E%3Cstop offset='1' stop-color='%23A5A9BC'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_504_1550'%3E%3Crect width='2406' height='965' rx='8' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A\")",
              backgroundPosition: '50% 0%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              transform: 'scaleX(-1)',
              zIndex: -1,
              top: 0,
              left: 0
            }}></Box>

          <Flex direction="row" justify={'center'}>
            <Box sx={{ maxWidth: 1200, width: '90%', paddingTop: '3vh' }}>{children}</Box>
          </Flex>
        </Box>
      </MediaQuery>
    </Box>
  </Box>
);

export default Layout;
