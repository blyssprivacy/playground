import { Anchor, Button, ButtonProps, createStyles, Group, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

const useStyles = createStyles(theme => ({
  button: {
    minWidth: 122,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    textTransform: 'uppercase',
    fontWeight: 500,
    letterSpacing: '0.02em'
  },
  buttonInverted: {
    minWidth: 122,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    textTransform: 'uppercase',
    fontWeight: 500,
    color: theme.colors.almostBlack[6],
    backgroundColor: 'white',
    letterSpacing: '0.02em',
    border: 'none'
  }
}));

export default function ActionButton({
  children,
  variant,
  href,
  invertColor,
  dashedOutline,
  disabled,
  w,
  p,
  onClick,
  ...styles
}: {
  children: React.ReactNode;
  variant?: ButtonProps['variant'];
  href?: string;
  invertColor?: boolean;
  dashedOutline?: boolean;
  disabled?: boolean;
  w?: number;
  p?: number;
  onClick?: () => void;
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const invertClass = invertColor ? ' invert' : '';

  const onClickWrap: MouseEventHandler<HTMLElement> = e => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (disabled && children?.toString().includes('beta')) {
    children = 'Beta coming soon';
  }

  if (!variant) {
    variant = invertColor ? 'default' : 'filled';
  }

  if (dashedOutline) {
    styles = { border: '1px dashed #161212' };
  }

  return (
    <Button
      className={invertColor ? classes.buttonInverted : classes.button}
      component="a"
      href={href}
      variant={variant}
      color="almostBlack"
      radius={0}
      onClick={onClickWrap}
      sx={styles}
      w={w}
      p={p}>
      {children}
    </Button>
  );
}
