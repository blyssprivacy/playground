import { Tooltip } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';

export default function HelpBox({ hint }: { hint: string }) {
  return (
    <Tooltip
      label={hint}
      position="top"
      color="gray.5"
      p="md"
      offset={8}
      withArrow
      multiline
      width={200}
      fz="sm"
      fw="normal">
      <IconQuestionMark color="dark.4" size={16} strokeWidth={1} />
    </Tooltip>
  );
}
