import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);
  return {
    button: {
      margin: spacing,
    },
    plusButton: {
      marginTop: spacing,
      marginBottom: spacing,
    },
  };
});

export default useStyles;
