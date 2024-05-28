import { expect } from 'vitest';

interface CustomMatchers<R = unknown> {
  toStartWith(prefix: string): R;
}

declare module 'vitest' {
  interface Assertion extends CustomMatchers { }
  interface AsymmetricMatchersContaining extends CustomMatchers { }
}

expect.extend({
  toStartWith(received, prefix) {
    const pass = received.startsWith(prefix);
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to start with ${prefix}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to start with ${prefix}`,
        pass: false,
      };
    }
  },
});
