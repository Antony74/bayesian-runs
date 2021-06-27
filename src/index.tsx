import '@fontsource/roboto';
import * as React from 'react';
import {
  Box,
  Container,
  List,
  ListItemText,
  Typography,
} from '@material-ui/core';
import AfterFix from './AfterFix';
import BChart from './BChart';
import BeforeFix from './BeforeFix';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { indentProps } from './props';
import ReactDOM from 'react-dom';
import Stats from './Stats';
import useBayes from './useBayes';

const App = () => {
  const hook = useBayes();

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
        <Box>
          <BeforeFix hook={hook}></BeforeFix>
          <Box>
            <Typography>
              I have attempted to fix this transient bug. Assume that:
            </Typography>
            <Box {...indentProps}>
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
            </Box>
          </Box>
          <Box>
            <BChart hook={hook}></BChart>
            <Stats hook={hook}></Stats>
            <br></br>
            <AfterFix hook={hook}></AfterFix>
          </Box>
        </Box>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
