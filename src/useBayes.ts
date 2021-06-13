import * as React from 'react';
import { bayes, sum } from './stats';

interface BayesState {
  data: number[];
}

interface BayesHook {
  state: BayesState;
  getGraphData: () => { x: number; y: number }[];
  getSum: () => number;
  addSuccess: () => void;
  addFailure: () => void;
  reset: () => void;
}

const useBayes = (): BayesHook => {
  const N = 100;
  const priors: number[] = Array(N).fill(1 / N);

  const [state, setState] = React.useState({ data: priors });

  const doBayes = (likelihoods) =>
    setState({ ...state, data: bayes(likelihoods, state.data) });

  return {
    state,
    getGraphData: () =>
      state.data.map((y, index) => {
        const x = index / N;
        return { x, y };
      }),
    getSum: () => sum(state.data),
    addSuccess: () => {
      const likelihoods = Array(N)
        .fill(0)
        .map((_v, index) => 1 - (index / N));
      doBayes(likelihoods);
    },
    addFailure: () => {
      const likelihoods = Array(N)
        .fill(0)
        .map((_v, index) => index / N);
      doBayes(likelihoods);
    },
    reset: () => {
      setState({ ...state, data: priors });
    },
  };
};

export default useBayes;
