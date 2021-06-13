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
import { posteriors } from './bayes';
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

const data = posteriors.map((y, x) => {
  return { x, y };
});

const centerProps = { align: 'center' } as BoxProps;

const App = () => {
  return (
    <div>
      <Container>
        <Box {...centerProps}>
          <Box>
            <Typography>I have a computer program/job. I ran it and</Typography>
          </Box>
          <Box>
            <Button>It succeeded</Button>
            <Button>It failed</Button>
            <Button color="secondary">Reset</Button>
          </Box>
          <Box>
            <VictoryChart
              theme={VictoryTheme.material}
              width={800}
              height={200}
            >
              <VictoryAxis
                label="Chance of failure"
                tickValues={[0, 100]}
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
              <VictoryBar data={data}></VictoryBar>
            </VictoryChart>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
