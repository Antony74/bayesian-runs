import '@fontsource/roboto';
import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import AfterFix from './AfterFix';
import Assumptions from './Assumptions';
import BChart from './BChart';
import BeforeFix from './BeforeFix';
import GitHubForkRibbon from 'react-github-fork-ribbon';
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
          <Assumptions></Assumptions>
          <BChart hook={hook}></BChart>
          <Stats hook={hook}></Stats>
          <br></br>
          <AfterFix hook={hook}></AfterFix>
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
