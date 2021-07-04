import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { indentProps, spanProps } from './props';
import { BayesHook } from './useBayes';
import InputNumber from './InputNumber';

const AfterFix = ({ hook }: { hook: BayesHook }): JSX.Element => {
  if (hook.getTotalCount() === 0) {
    return <></>;
  }

  return (
    <Box>
      <Box>
        <Typography {...spanProps}>I run my program a further </Typography>
        <InputNumber numberHook={hook.successAfterFixCount}></InputNumber>
        <Typography {...spanProps}>
          time(s), and each run is successful.
        </Typography>
      </Box>
      <Box {...indentProps}>
        <Typography>
          On average (median), this would have caused the original program to
          have failed (at least once){' '}
          {(1 - Math.pow(1 - hook.median, hook.successAfterFixCount.get())) *
            100}
          % of the time, so I could take that as the level of 'confidence'
          demonstrated in my fix.
        </Typography>
        <Typography>
          However, that doesn't take into account how much data we have
          collected (we should hope more data would give us more certainty and
          therefore take less attempts to verify).
        </Typography>
        <Typography>
          If instead I take the value just outside of the 95% HDI, to the left
          where the chance of failure is {hook.justOutsideX * 100}%. This would
          have caused the original program to have failed (at least once){' '}
          {(1 -
            Math.pow(1 - hook.justOutsideX, hook.successAfterFixCount.get())) *
            100}
          % of the time.
        </Typography>
      </Box>
    </Box>
  );
};

export default AfterFix;
