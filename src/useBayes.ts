import * as React from 'react';
import { bayes, sum } from './statUtils';

interface BayesState {
  data: number[];
  successCount: number;
  failureCount: number;
}

interface BayesHook extends BayesState {
  getGraphData: () => { x: number; y: number }[];
  getSum: () => number;
  setSuccessCount: (count: number) => void;
  setFailureCount: (count: number) => void;
  reset: () => void;
}

const useBayes = (): BayesHook => {
  const N = 100;
  const priors: number[] = Array(N).fill(1 / N);

  const [state, setState] = React.useState<BayesState>({
    data: priors,
    successCount: 0,
    failureCount: 0,
  });

  const addSuccess = (data) => {
    const likelihoods = Array(N)
      .fill(0)
      .map((_v, index) => 1 - (index / N));
    return bayes(likelihoods, data);
  };

  const addFailure = (data) => {
    const likelihoods = Array(N)
      .fill(0)
      .map((_v, index) => index / N);
    return bayes(likelihoods, data);
  };

  const makeNumbers = (successes: number, failures: number) => {
    if (successes < state.successCount || failures < state.failureCount) {
      hook.reset();
    }

    let data = state.data;

    data = Array(successes - state.successCount)
      .fill(0)
      .reduce(addSuccess, data);

    data = Array(failures - state.failureCount)
      .fill(0)
      .reduce(addFailure, data);

    setState({ ...state, data });
  };

  const hook = {
    ...state,
    getGraphData: () =>
      state.data.map((y, index) => {
        const x = index / N;
        return { x, y };
      }),
    getSum: () => sum(state.data),
    setSuccessCount: (successCount) =>
      makeNumbers(successCount, state.failureCount),
    setFailureCount: (failureCount) =>
      makeNumbers(state.successCount, failureCount),
    reset: () => {
      setState({ ...state, data: priors });
    },
  };

  return hook;
};

export default useBayes;
