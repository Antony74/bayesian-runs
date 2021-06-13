import '@fontsource/roboto';
import * as React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button as RawButton,
  Typography,
} from '@material-ui/core';
import ReactDOM from 'react-dom';

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
