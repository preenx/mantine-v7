import { rem } from '@mantine/core';
import React from 'react';

interface CopyIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  copied: boolean;
}

export function CopyIcon({ copied, style, ...others }: CopyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: rem(18), height: rem(18), ...style }}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...others}
    >
      {copied ? (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          <path d="M9 14l2 2l4 -4" />
        </>
      ) : (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l.01 0" />
          <path d="M13 12l2 0" />
          <path d="M9 16l.01 0" />
          <path d="M13 16l2 0" />
        </>
      )}
    </svg>
  );
}

CopyIcon.displayName = '@mantine/code-highlight/CopyIcon';
