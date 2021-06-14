import '@fontsource/roboto';
import * as React from 'react';
import {
  Box,
  BoxProps,
  Button,
  Container,
  Input,
  makeStyles,
  Typography,
} from '@material-ui/core';
import BChart from './BChart';
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

  return (
    <div>
      <Container>
        <Box {...centerProps}>
          <Box>
            <Typography>
              I have a computer program/job. I ran it a total of{' '}
              {hook.successCount + hook.failureCount} time(s).
            </Typography>
          </Box>
          <Box {...spanProps}>
            <Typography {...spanProps}>It succeeded </Typography>
            <InputNumber value="0"></InputNumber>
            <PlusButton>+</PlusButton>
            <Typography {...spanProps}>times(s).</Typography>
          </Box>
          <Box {...spanProps}>
            <Typography {...spanProps}> It failed</Typography>
            <InputNumber value="0"></InputNumber> <PlusButton>+</PlusButton>
            <Typography {...spanProps}>time(s).</Typography>
            <ContainedButton onClick={hook.reset} color="secondary">
              Reset
            </ContainedButton>
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
