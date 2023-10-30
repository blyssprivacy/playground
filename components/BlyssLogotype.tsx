import { Text, createStyles, Anchor, useMantineTheme } from '@mantine/core';
import { Source_Sans_3 } from 'next/font/google';

const source_sans_3 = Source_Sans_3({ subsets: ['latin', 'latin-ext'], weight: ['600'] });

const useStyles = createStyles(theme => ({
  logotype: {
    height: 36,
    fontFamily: source_sans_3.style.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '45px',
    letterSpacing: '-0.04em'
  }
}));

export default function BlyssLogotype({ href }: { href?: string }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  let baseColor = '#e9e9e9';
  let hoverColor = theme.colors.gray[0];

  return (
    <div>
      <Anchor
        href={href || '/'}
        className={classes.logotype}
        sx={{
          color: baseColor,
          '&:hover': { textDecoration: 'none', color: hoverColor }
        }}>
        blyss
      </Anchor>
    </div>
  );
}
