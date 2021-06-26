import * as React from 'react';
import { bayes, sum } from './statUtils';
import useNumber, { NumberHook } from './useNumber';

interface BayesState {
  data: number[];
  successCount: number;
  failureCount: number;
}

export interface BayesHook {
  data: number[];
  successCount: NumberHook;
  failureCount: NumberHook;
  graphData: { x: number; y: number; stroke: string, fill: string }[];
  mostProbableX: number;
  getSum: () => number;
  getTotalCount: () => number;
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

  const successCount = useNumber();
  const failureCount = useNumber();

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
    let data = state.data;
    let currentSuccessCount = state.successCount;
    let currentFailureCount = state.failureCount;

    if (successes < currentSuccessCount || failures < currentFailureCount) {
      data = priors;
      currentSuccessCount = 0;
      currentFailureCount = 0;
    }

    data = Array(successes - currentSuccessCount)
      .fill(0)
      .reduce(addSuccess, data);

    data = Array(failures - currentFailureCount)
      .fill(0)
      .reduce(addFailure, data);

    setState({
      ...state,
      data,
      successCount: successes,
      failureCount: failures,
    });
  };

  if (
    successCount.get() !== state.successCount ||
    failureCount.get() !== state.failureCount
  ) {
    makeNumbers(successCount.get(), failureCount.get());
  }

  const stats = React.useMemo(() => {
    const mostProbable = state.data.reduce(
      (acc, value, index) => (value > acc.y ? { index, y: value } : acc),
      { index: 0, y: 0 }
    );

    if (successCount.get() + failureCount.get() === 0) {
      mostProbable.index = -1;
    }

    const graphData = state.data.map((y, index) => {
      const x = index / N;

      const stroke = index === mostProbable.index ? 'red' : 'black';
      const fill = 'black';

      return { x, y, stroke, fill };
    });

    return {
      graphData,
      mostProbableX: mostProbable.index > 0 ? graphData[mostProbable.index].x : 0,
    };
  }, state.data);

  const hook = {
    data: state.data,
    successCount,
    failureCount,
    graphData: stats.graphData,
    mostProbableX: stats.mostProbableX,
    getSum: () => sum(state.data),
    reset: () => {
      setState({ ...state, data: priors });
      successCount.set('0');
      failureCount.set('0');
    },
    getTotalCount: () => hook.successCount.get() + hook.failureCount.get(),
  };

  return hook;
};

export default useBayes;
