const wrapUnary = (fn: (value: number) => number) => {
  return (a: number | number[]) => {
    if (typeof a === 'number') {
      return fn(a);
    } else if (Array.isArray(a)) {
      const arrOut = Array(a.length);
      for (let n = 0; n < a.length; ++n) {
        arrOut[n] = fn(a[n]);
      }
      return arrOut;
    } else {
      throw 'Not supported';
    }
  };
};

const wrapBinary = (fn: (value1: number, value2: number) => number) => {
  return (a: number | number[], b: number | number[]): number[] => {
    if (typeof a === 'number' && typeof b === 'number') {
      return [fn(a, b)];
    } else if (typeof a === 'number' && Array.isArray(b)) {
      return Array(b.length)
        .fill(0)
        .map((_v, n) => fn(a, b[n]));
    } else if (Array.isArray(a) && typeof b === 'number') {
      return Array(a.length)
        .fill(0)
        .map((_v, n) => fn(a[n], b));
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        throw 'Array lengths differ';
      }

      return Array(a.length)
        .fill(0)
        .map((_v, n) => fn(a[n], b[n]));
    } else {
      throw 'Not supported';
    }
  };
};

// Define various wrappers
const div = wrapBinary((a, b) => a / b);
const mul = wrapBinary((a, b) => a * b);
const pow = wrapBinary(Math.pow);
const neg = wrapUnary((a) => -a);
const exp = wrapUnary(Math.exp);

const factorial = (x: number) => {
  let f = 1;
  for (let n = 1; n <= x; ++n) {
    f *= n;
  }

  return f;
};

export const sum = (arr: number[]): number => {
  let result = 0;

  for (let n = 0; n < arr.length; ++n) {
    result += arr[n];
  }

  return result;
};

const possion = (x: number, lambda: number | number[]) => {
  // Only do it this way for very small values of x
  return div(mul(exp(neg(lambda)), pow(lambda, x)), factorial(x));
};

export const bayes = (
  likelihoods: number | number[],
  priors: number | number[]
): number[] => {
  const lp = mul(likelihoods, priors);
  const evidence = sum(lp);
  return div(lp, evidence);
};

// Choose a sample of possible lambda
const lambda: number[] = [];
for (let n = 0.1; n <= 20; n += 0.1) {
  lambda.push(n);
}

const N = lambda.length;

// Choose some priors
const priors = Array(N);
priors.fill(1 / N);

// Calculate likelihoods
const likelihoods = possion(2, lambda);

// Calculate posteriors
const posteriors = bayes(likelihoods, priors);

const p = (t: number) => {
  const possibities = exp(neg(mul(lambda, t)));
  return sum(mul(possibities, posteriors));
};

console.log('p(1.72)=' + p(1.72));
