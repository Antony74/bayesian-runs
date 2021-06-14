import '@fontsource/roboto';
import * as React from 'react';
import {
  Box,
  BoxProps,
  Container,
  makeStyles,
  Button as RawButton,
  Typography,
} from '@material-ui/core';
import BChart from './BChart';
import ReactDOM from 'react-dom';
import Stats from './Stats';
import useBayes from './useBayes';

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

const centerProps = { align: 'center' } as BoxProps;

const App = () => {
  const hook = useBayes();

  return (
    <div>
      <Container>
        <Box {...centerProps}>
          <Box>
            <Typography>
              I have a computer program/job. I ran it a total of {}
            </Typography>
          </Box>
          <Box>
            <Button onClick={() => hook.setSuccessCount(hook.successCount + 1)}>
              It succeeded
            </Button>
            <Button onClick={() => hook.setFailureCount(hook.failureCount + 1)}>
              It failed
            </Button>
            <Button onClick={hook.reset} color="secondary">
              Reset
            </Button>
          </Box>
          <Box>
            <BChart graphData={hook.getGraphData()}></BChart>
            <Stats data={hook.data}></Stats>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
