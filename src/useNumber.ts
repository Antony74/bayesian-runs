import * as React from 'react';

const maxLength = 3;

export interface NumberHook {
  get: () => number;
  increment: () => void;
  set: (value: string) => void;
}

const useNumber = (): NumberHook => {
  const [state, setState] = React.useState('0');

  const hook = {
    get: () => (state === '' ? 0 : parseInt(state)),
    increment: () => setState((hook.get() + 1).toString()),
    set: (value: string) => {
      // Strip anything that is not a digit
      value = value
        .split('')
        .filter((s) => s >= '0' && s <= '9')
        .join('');

      // Does this value need truncating?
      if (value.length > maxLength) {
        // Yes.  Has a single character has been added to the end?
        if (
          value.length === maxLength + 1 &&
          value.slice(0, maxLength) === state
        ) {
          // Yes.  Truncate from front
          value = value.slice(-maxLength);
        } else {
          // Otherwise truncate from end
          value = value.slice(0, maxLength);
        }
      }

      setState(value);
    },
  };

  return hook;
};

export default useNumber;
