// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 9, b: 2, action: Action.Subtract, expected: 7 },
  { a: 86, b: 20, action: Action.Subtract, expected: 66 },
  { a: 50, b: 4, action: Action.Subtract, expected: 46 },
  { a: 50, b: 4, action: Action.Multiply, expected: 200 },
  { a: 6, b: 8, action: Action.Multiply, expected: 48 },
  { a: 1, b: 5, action: Action.Multiply, expected: 5 },
  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 20, b: 5, action: Action.Divide, expected: 4 },
  { a: 99, b: 11, action: Action.Divide, expected: 9 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
  { a: 8, b: 1, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should $action two numbers',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
