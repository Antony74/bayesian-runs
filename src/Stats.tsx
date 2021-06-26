import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { BayesHook } from './useBayes';
import { sum } from './statUtils';

const Stats = ({ hook }: { hook: BayesHook }): JSX.Element => {
  if (hook.getTotalCount() === 0) {
    return <></>;
  }

  return (
    <Box>
      <Typography>
        Sum: {sum(hook.data)} (sanity check, should be close to 1)
      </Typography>
      <Typography>
        Most probable chance of failure: {hook.mostProbableX}
      </Typography>
      <Typography>
        Failures divided by total:{' '}
        {hook.failureCount.get() / hook.getTotalCount()}
      </Typography>
    </Box>
  );
};

export default Stats;
