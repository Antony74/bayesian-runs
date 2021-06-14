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
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import ReactDOM from 'react-dom';
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
const xTicks = 10;

const App = () => {
  const hook = useBayes();

  return (
    <div>
      <Container>
        <Box {...centerProps}>
          <Box>
            <Typography>I have a computer program/job. I ran it a total of {}</Typography>
          </Box>
          <Box>
            <Button onClick={() => hook.setSuccessCount(hook.successCount + 1)}>It succeeded</Button>
            <Button onClick={() => hook.setFailureCount(hook.failureCount + 1)}>It failed</Button>
            <Button onClick={hook.reset} color="secondary">
              Reset
            </Button>
          </Box>
          <Box>
            <VictoryChart
              theme={VictoryTheme.material}
              width={800}
              height={200}
            >
              <VictoryAxis
                label="Chance of failure"
                tickValues={Array(xTicks + 1)
                  .fill(0)
                  .map((_v, i) => i / xTicks)}
                style={{
                  tickLabels: { fontSize: '8px', padding: 1 },
                  axisLabel: { padding: 15 },
                }}
              ></VictoryAxis>
              <VictoryAxis
                label="Probability of this scenario"
                dependentAxis
                style={{
                  tickLabels: { fontSize: '8px', padding: 1 },
                  axisLabel: { padding: 30 },
                }}
              ></VictoryAxis>
              <VictoryBar data={hook.getGraphData()}></VictoryBar>
            </VictoryChart>
            <Typography>
              Sum: {hook.getSum()} (sanity check, should be close to 1){' '}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
