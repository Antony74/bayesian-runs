import * as React from 'react';
import { Button } from '@material-ui/core';
import useStyles from './useStyles';

const ResetButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={onClick}
      color="secondary"
    >
      Reset
    </Button>
  );
};

export default ResetButton;
