import * as React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import useStyles from './useStyles';

const PlusButton = (props: ButtonProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Button
      className={classes.plusButton}
      variant="contained"
      style={{
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
      }}
      {...props}
    ></Button>
  );
};

export default PlusButton;
