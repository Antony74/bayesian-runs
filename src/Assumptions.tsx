import * as React from 'react';
import { Box, List, ListItemText, Typography } from '@material-ui/core';
import { indentProps } from './props';

const Assumptions = (): JSX.Element => (
  <Box>
    <Typography>
      I have attempted to fix this transient bug. Assume that:
    </Typography>
    <Box {...indentProps}>
      <List>
        <ListItemText>
          • The program is failing randomly, with a fixed (but unknown) chance
          of failure.
        </ListItemText>
        <ListItemText>
          • Before the first time I ran the original program, all failure
          probabilities were equally likely.
        </ListItemText>
        <ListItemText>
          • An unsuccessful fix will have no effect on the frequency with which
          the problem is occurring.
        </ListItemText>
        <ListItemText>
          • The problem will never re-occur if the fix is successful.
        </ListItemText>
      </List>
    </Box>
  </Box>
);

export default Assumptions;
