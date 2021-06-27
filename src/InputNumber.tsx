import * as React from 'react';
import { Input, InputProps } from '@material-ui/core';

const InputNumber = (props: InputProps): JSX.Element => (
  <Input
    style={{
      maxWidth: '60px',
      minWidth: '60px',
    }}
    {...props}
  ></Input>
);

export default InputNumber;
