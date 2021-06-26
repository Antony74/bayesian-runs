import '@fontsource/roboto';
import * as React from 'react';
import {
  Box,
  BoxProps,
  Button,
  Container,
  Input,
  List,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import BChart from './BChart';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import ReactDOM from 'react-dom';
import Stats from './Stats';
import useBayes from './useBayes';

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

const ContainedButton = (props) => {
  const classes = useStyles();
  return (
    <Button className={classes.button} variant="contained" {...props}></Button>
  );
};

const PlusButton = (props) => {
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

const InputNumber = (props) => (
  <Input
    style={{
      maxWidth: '60px',
      minWidth: '60px',
    }}
    {...props}
  ></Input>
);

const spanProps = { style: { display: 'inline-block', margin: 5 } };

const centerProps = { align: 'center' } as BoxProps;

const App = () => {
  const hook = useBayes();
  const averageChanceOfFailure = hook.failureCount.get() / hook.getTotalCount();

  return (
    <div>
      <GitHubForkRibbon
        href="https://github.com/Antony74/bayesian-runs"
        target="_blank"
        position="right"
      >
        Fork me on GitHub
      </GitHubForkRibbon>

      <Container>
        <Box {...centerProps}>
          <Box>
            <Typography>
              I have a computer program/job. I ran it a total of{' '}
              {hook.getTotalCount()} time(s).
            </Typography>
          </Box>
          <Box {...spanProps}>
            <Typography {...spanProps}>It succeeded </Typography>
            <InputNumber
              value={hook.successCount.get()}
              onChange={(e) => hook.successCount.set(e.target.value)}
            ></InputNumber>
            <PlusButton onClick={() => hook.successCount.increment()}>
              +
            </PlusButton>
            <Typography {...spanProps}>times(s).</Typography>
          </Box>
          <Box {...spanProps}>
            <Typography {...spanProps}> It failed</Typography>
            <InputNumber
              value={hook.failureCount.get()}
              onChange={(e) => {
                hook.failureCount.set(e.target.value);
              }}
            ></InputNumber>{' '}
            <PlusButton onClick={() => hook.failureCount.increment()}>
              +
            </PlusButton>
            <Typography {...spanProps}>time(s).</Typography>
            <ContainedButton onClick={hook.reset} color="secondary">
              Reset
            </ContainedButton>
          </Box>
          <Box>
            <Typography>
              I have attempted to fix this transient bug. Assume that:
              <List>
                <ListItemText>
                  • The program is failing randomly, with a fixed (but unknown)
                  chance of failure.
                </ListItemText>
                <ListItemText>
                  • Before the first time I ran the original program, all
                  failure probabilities were equally likely.
                </ListItemText>
                <ListItemText>
                  • An unsuccessful fix will have no effect on the frequency
                  with which the problem is occurring.
                </ListItemText>
                <ListItemText>
                  • The problem will never re-occur if the fix is successful.
                </ListItemText>
              </List>
            </Typography>
          </Box>
          <Box>
            <BChart hook={hook}></BChart>
            <Stats hook={hook}></Stats>
          </Box>
          <Box>
            <Typography {...spanProps}>I run my program a further</Typography>{' '}
            <InputNumber
              value={hook.successAfterFixCount.get()}
              onChange={(e) => hook.successAfterFixCount.set(e.target.value)}
            ></InputNumber>
            <PlusButton onClick={() => hook.successAfterFixCount.increment()}>
              +
            </PlusButton>
            <Typography {...spanProps}>
              time(s), and each run is successful.
            </Typography>
            <Typography>
              On average, this would have caused the original program to have
              failed (at least once){' '}
              {(1 -
                Math.pow(
                  averageChanceOfFailure,
                  hook.successAfterFixCount.get()
                )) *
                100}
              % of the time, so I could take that as the level of 'confidence'
              demonstrated in my fix.
            </Typography>
            <Typography>
              However, that doesn't take into account how much data we have
              collected and what certainty that gives us (e.g. that calculation
              would return the same result for 1 failure in 10 runs at it would
              for 100 failures in 1000 runs)
            </Typography>
            <Typography>
              If instead I take the value just outside of the 95% HDI, to the
              left where the chance of failure is {hook.justOutsideX * 100}%.
              This would have caused the original program to have failed (at
              least once){' '}
              {(1 -
                Math.pow(
                  1 - hook.justOutsideX,
                  hook.successAfterFixCount.get()
                )) *
                100}
              % of the time.
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
