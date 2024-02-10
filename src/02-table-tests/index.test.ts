// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  {
    name: 'should add two numbers',
    a: 22,
    b: 33,
    action: Action.Add,
    expected: 55,
  },
  {
    name: 'should subtract two numbers',
    a: 44,
    b: 33,
    action: Action.Subtract,
    expected: 11,
  },
  {
    name: 'should multiply two numbers',
    a: 2,
    b: 33,
    action: Action.Multiply,
    expected: 66,
  },
  {
    name: 'should divide two numbers',
    a: 21,
    b: 7,
    action: Action.Divide,
    expected: 3,
  },
  {
    name: 'should exponentiate two numbers',
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
  },
  {
    name: 'should return null for invalid action',
    a: 3,
    b: 2,
    action: 'ivalidAction',
    expected: null,
  },
  {
    name: 'should return null for invalid arguments',
    a: 'thisIsString',
    b: 33,
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator tests', () => {
  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(expected);
  });
});
