import * as React from 'react';

import { Box, BoxProps, Typography } from '@material-ui/core';
import { BayesHook } from './useBayes';
import { sum } from './statUtils';

const centerProps = { align: 'center' } as BoxProps;

const Stats = ({ hook }: { hook: BayesHook }): JSX.Element => {
  if (hook.getTotalCount() === 0) {
    return <></>;
  }

  return (
    <Box {...centerProps}>
      <Typography>
        Sum: {sum(hook.data)} (sanity check, should be close to 1)
      </Typography>
      <Typography>
        Most probable chance of failure: {hook.mostProbableX} (shown in red)
      </Typography>
      <Typography>
        Failures divided by total:{' '}
        {hook.failureCount.get() / hook.getTotalCount()}
      </Typography>
      <Typography>
        95% highest density interval (HDI, shown in blue) runs from{' '}
        {hook.hdi.start} to {hook.hdi.end} (range {hook.hdi.range})
      </Typography>
    </Box>
  );
};

export default Stats;
