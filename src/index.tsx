import {
  Box,
  Button as RawButton,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
}));

const Button = (props) => {
    const classes = useStyles();
    return (
    <RawButton
      className={classes.button}
      variant="contained"
      {...props}
    ></RawButton>
  );
};

const App = () => {
  return (
    <div>
      <Container>
        <Box>
          <Typography>I have a computer program/job. I ran and</Typography>
        </Box>
        <Box>
          <Button>It succeeded</Button>
          <Button>It failed</Button>
          <Button color="secondary">Reset</Button>
        </Box>
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
