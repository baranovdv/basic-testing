// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 22, b: 33, action: Action.Add });
    expect(result).toBe(55);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 44, b: 33, action: Action.Subtract });
    expect(res).toBe(11);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 33, action: Action.Multiply });
    expect(res).toBe(66);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 21, b: 7, action: Action.Divide });
    expect(res).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(res).toBe(8);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 22, b: 33, action: 'invalidAction' });
    expect(res).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({
      a: 'thisIsString',
      b: 33,
      action: Action.Add,
    });
    expect(res).toBe(null);
  });
});
