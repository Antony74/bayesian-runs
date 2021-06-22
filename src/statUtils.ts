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

