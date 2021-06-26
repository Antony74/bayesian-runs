import * as React from 'react';
import { bayes, sum } from './statUtils';
import useNumber, { NumberHook } from './useNumber';

interface BayesState {
  data: number[];
  successCount: number;
  failureCount: number;
}

interface Interval {
  start: number;
  end: number;
  range: number;
}

export interface BayesHook {
  data: number[];
  successCount: NumberHook;
  failureCount: NumberHook;
  graphData: { x: number; y: number; stroke: string; fill: string }[];
  mostProbableX: number;
  hdi: Interval;
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

  const getHdi = (size: number): Interval => {
    let interval: Interval = {
      start: 0,
      end: Number.MAX_SAFE_INTEGER,
      range: Number.MAX_SAFE_INTEGER,
    };
    for (let start = 0; start < N; ++start) {
      let total = 0;
      for (let index = start; index < N; ++index) {
        total += state.data[index];
        if (total >= size) {
          const currentInterval = {
            start: start,
            end: index,
            range: index - start,
          };
          if (currentInterval.range < interval.range) {
            interval = currentInterval;
          }
        }
      }
    }
    return interval;
  };

  const stats = React.useMemo(() => {
    const mostProbable = state.data.reduce(
      (acc, value, index) => (value > acc.y ? { index, y: value } : acc),
      { index: 0, y: 0 }
    );

    const totalCount = successCount.get() + failureCount.get();

    const hdi = getHdi(0.95);

    const graphData = state.data.map((y, index) => {
      const x = index / N;

      if (totalCount === 0) {
        return { x, y, stroke: 'black', fill: 'black' };
      } else {
        const stroke = index === mostProbable.index ? 'red' : 'black';
        const fill = hdi.start <= index && index <= hdi.end ? 'blue' : 'black';

        return { x, y, stroke, fill };
      }
    });

    const start = graphData[hdi.start].x;
    const end = graphData[hdi.end].x;

    return {
      graphData,
      mostProbableX: graphData[mostProbable.index].x,
      hdi: { start, end, range: end - start },
    };
  }, state.data);

  const hook = {
    data: state.data,
    successCount,
    failureCount,
    graphData: stats.graphData,
    mostProbableX: stats.mostProbableX,
    hdi: stats.hdi,
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
