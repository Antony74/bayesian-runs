import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { sum } from './statUtils';

interface StatsProps {
  data: number[];
}

const Stats = (props: StatsProps): JSX.Element => (
  <Box>
    <Typography>
      Sum: {sum(props.data)} (sanity check, should be close to 1){' '}
    </Typography>
  </Box>
);

export default Stats;
