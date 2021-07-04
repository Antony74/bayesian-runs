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
  successAfterFixCount: NumberHook;
  graphData: { x: number; y: number; stroke: string; fill: string }[];
  mode: number;
  median: number;
  justOutsideX: number;
  hdi: Interval;
  getSum: () => number;
  getTotalCount: () => number;
  reset: () => void;
}

const useBayes = (): BayesHook => {
  const N = 101;
  const priors: number[] = Array(N).fill(1 / N);

  const [state, setState] = React.useState<BayesState>({
    data: priors,
    successCount: 0,
    failureCount: 0,
  });

  const successCount = useNumber(0);
  const failureCount = useNumber(0);
  const successAfterFixCount = useNumber(1);

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
    let intervals: Interval[] = [
      {
        start: 0,
        end: Number.MAX_SAFE_INTEGER,
        range: Number.MAX_SAFE_INTEGER,
      },
    ];

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
          if (currentInterval.range === intervals[0].range) {
            intervals.push(currentInterval);
          } else if (currentInterval.range < intervals[0].range) {
            intervals = [currentInterval];
          }
        }
      }
    }
    return intervals[Math.floor((intervals.length - 1) / 2)];
  };

  const stats = React.useMemo(() => {
    const tolerence = 0.00001;

    const mode = state.data.reduce(
      (acc, value, index) => {
        return value > acc.y + tolerence ? { index, y: value } : acc;
      },
      { index: 0, y: 0 }
    );

    const medianIndex = state.data.reduce(
      (acc, value, index) => {
        if (acc.index !== -1) {
          return acc;
        }
        const newSum = acc.sum + value;
        if (newSum >= 0.5) {
          if (newSum - 0.5 >= 0.5 - acc.sum + tolerence) {
            return { index: index - 1, sum: acc.sum };
          } else {
            return { index, sum: newSum };
          }
        }
        return { index: -1, sum: newSum };
      },
      { index: -1, sum: 0 }
    ).index;

    const totalCount = successCount.get() + failureCount.get();

    const hdi = getHdi(0.95);

    const graphData = state.data.map((y, index) => {
      const x = index / (N - 1);

      let fill = 'black';
      let stroke = 'black';

      if (totalCount !== 0) {
        stroke = index === mode.index ? 'red' : 'black';
        fill = hdi.start <= index && index <= hdi.end ? 'blue' : 'black';
      }

      if (index === medianIndex) {
        fill = 'green';
      }

      return { x, y, stroke, fill };
    });

    const start = graphData[hdi.start].x;
    const end = graphData[hdi.end].x;

    return {
      graphData,
      mode: graphData[mode.index].x,
      median: graphData[medianIndex].x,
      hdi: { start, end, range: end - start },
      justOutsideX: graphData[Math.max(hdi.start - 1, 0)].x,
    };
  }, state.data);

  const hook = {
    data: state.data,
    successCount,
    failureCount,
    successAfterFixCount,
    graphData: stats.graphData,
    mode: stats.mode,
    median: stats.median,
    justOutsideX: stats.justOutsideX,
    hdi: stats.hdi,
    getSum: () => sum(state.data),
    reset: () => {
      setState({ ...state, data: priors });
      successCount.set('0');
      failureCount.set('0');
      successAfterFixCount.set('1');
    },
    getTotalCount: () => hook.successCount.get() + hook.failureCount.get(),
  };

  return hook;
};

export default useBayes;
