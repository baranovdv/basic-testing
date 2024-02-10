// Uncomment the code below and write your tests
import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(22);

    expect(result).toBe(22);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('myErrorMessage')).toThrowError('myErrorMessage');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrowError(
      'This is my awesome custom error!',
    );
  });
});
