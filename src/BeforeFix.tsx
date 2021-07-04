import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { indentProps, spanProps } from './props';
import { BayesHook } from './useBayes';
import InputNumber from './InputNumber';
import ResetButton from './ResetButton';

const BeforeFix = ({ hook }: { hook: BayesHook }): JSX.Element => (
  <Box>
    <Box>
      <Typography>
        I have a computer program/job. I ran it a total of{' '}
        {hook.getTotalCount()} time(s).
      </Typography>
    </Box>
    <Box {...spanProps} {...indentProps}>
      <Typography {...spanProps}>It succeeded </Typography>
      <InputNumber numberHook={hook.successCount}></InputNumber>
      <Typography {...spanProps}>times(s).</Typography>
    </Box>
    <Box {...spanProps}>
      <Typography {...spanProps}> It failed</Typography>
      <InputNumber numberHook={hook.failureCount}></InputNumber>
      <Typography {...spanProps}>time(s).</Typography>
      <ResetButton onClick={hook.reset}></ResetButton>
    </Box>
  </Box>
);

export default BeforeFix;
