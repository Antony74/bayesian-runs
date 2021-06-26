import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { BayesHook } from './useBayes';
import { sum } from './statUtils';

interface StatsProps {
  hook: BayesHook;
}

const Stats = ({ hook }: StatsProps): JSX.Element => {
  const mostProbable = hook
    .getGraphData()
    .reduce((acc, value) => (value.y > acc.y ? value : acc), { x: 0, y: 0 });

  if (hook.getTotalCount() === 0) {
    return <></>;
  }

  return (
    <Box>
      <Typography>
        Sum: {sum(hook.data)} (sanity check, should be close to 1)
      </Typography>
      <Typography>Most probable chance of failure: {mostProbable.x}</Typography>
      <Typography>
        Failures divided by total:{' '}
        {hook.failureCount.get() / hook.getTotalCount()}
      </Typography>
    </Box>
  );
};

export default Stats;
