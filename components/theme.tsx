import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  primaryColor: 'blyssPink',
  colorScheme: 'dark',

  colors: {
    almostBlack: [
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816',
      '#1a1816'
    ] as any,
    blyssPink: [
      '#FAF1F3',
      '#F5E3E6',
      '#F2D4D8',
      '#F0C4CA',
      '#F0B3BC',
      '#F2A1AD',
      '#F68E9D',
      '#EE8695',
      '#E67F8E',
      '#DE7A88'
    ] as any
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)'
  },

  fontFamily: "'IBM Plex Sans', sans-serif",

  headings: {
    fontFamily: "'IBM Plex Sans', sans-serif"
  }
};

export default theme;
