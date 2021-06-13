// By wrapping functions we are able to perform the same arithmetic operation
// on whole rows of data as easily as upon a single value.
// (The R programming language does this 'out of the box')

export const wrapUnary = (fn: (value: number) => number) => {
  return (a: number | number[]): number[] => {
    if (typeof a === 'number') {
      return [fn(a)];
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

export const wrapBinary = (fn: (value1: number, value2: number) => number) => {
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
export const sub = wrapBinary((a, b) => a - b);
export const div = wrapBinary((a, b) => a / b);
export const mul = wrapBinary((a, b) => a * b);
export const pow = wrapBinary(Math.pow);
export const neg = wrapUnary((a) => -a);
export const exp = wrapUnary(Math.exp);
