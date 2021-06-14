import { div, mul, pow, sub } from './functionWrappers';

export const sum = (arr: number[]): number => {
  let result = 0;

  for (let n = 0; n < arr.length; ++n) {
    result += arr[n];
  }

  return result;
};

export const bayes = (
  likelihoods: number | number[],
  priors: number | number[]
): number[] => {
  const lp = mul(likelihoods, priors);
  const evidence = sum(lp);
  return div(lp, evidence);
};

export const mean = (arr: number[]): number => sum(arr) / arr.length;

export const sd = (arr: number[]): number => {
  const _mean = mean(arr);
  return sum(pow(sub(arr, _mean), 2)) / arr.length;
};

// quantile... or is this more of a cumulative floor?
export const quantile = (arr: number[], percentile: number): number => {
  const _sum = sum(arr);
  let target = (percentile * _sum) / 100;
  for (let n = 0; n < arr.length; ++n) {
    if (target <= 0) {
      return n;
    }
    target -= arr[n];
  }
  return arr.length;
};
