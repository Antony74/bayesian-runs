import * as React from 'react';
import { Box, Input } from '@material-ui/core';
import { NumberHook } from './useNumber';
import PlusButton from './PlusButton';
import { spanProps } from './props';

const InputNumber = ({
  numberHook,
}: {
  numberHook: NumberHook;
}): JSX.Element => (
  <Box {...spanProps}>
    <Input
      style={{
        maxWidth: '60px',
        minWidth: '60px',
      }}
      value={numberHook.get()}
      onChange={(e) => numberHook.set(e.target.value)}
    ></Input>{' '}
    <PlusButton onClick={() => numberHook.increment()}>+</PlusButton>
  </Box>
);

export default InputNumber;
