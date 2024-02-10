// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);

    expect(() => account.withdraw(1500)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountFrom = getBankAccount(1000);
    const accountTo = getBankAccount(0);

    expect(() => accountFrom.transfer(1500, accountTo)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accountFrom = getBankAccount(1000);

    expect(() => accountFrom.transfer(1500, accountFrom)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(1500);

    expect(account.getBalance()).toBe(2500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(500);

    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const accountFrom = getBankAccount(1000);
    const accountTo = getBankAccount(0);

    accountFrom.transfer(100, accountTo);

    expect(accountTo.getBalance()).toBe(100);
    expect(accountFrom.getBalance()).toBe(900);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const randomNumValue = 20;

    (lodash.random as jest.Mock).mockReturnValue(randomNumValue);

    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const randomNumValueNewBalance = 20;

    (lodash.random as jest.Mock).mockReturnValue(randomNumValueNewBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(randomNumValueNewBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    const randomNumValueFail = 0;

    (lodash.random as jest.Mock).mockReturnValue(randomNumValueFail);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
