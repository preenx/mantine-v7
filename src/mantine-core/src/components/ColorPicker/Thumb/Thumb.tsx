import React, { forwardRef } from 'react';
import { Box, MantineSize, getSize } from '../../../core';
import { useColorPickerContext } from '../ColorPicker.context';

export interface ThumbProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: string;
  position: { x: number; y: number };
  size: MantineSize | (string & {});
}

export const Thumb = forwardRef<HTMLDivElement, ThumbProps>(
  ({ className, style, size, position, ...others }, ref) => {
    const { getStyles } = useColorPickerContext();
    return (
      <Box
        ref={ref}
        {...getStyles('thumb', { style })}
        vars={{
          '--thumb-size': getSize(size, 'thumb-size'),
          '--thumb-y-offset': `${position.y * 100}%`,
          '--thumb-x-offset': `${position.x * 100}%`,
        }}
        {...others}
      />
    );
  }
);

Thumb.displayName = '@mantine/core/ColorPickerThumb';
