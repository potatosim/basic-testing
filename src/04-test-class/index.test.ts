// Uncomment the code below and write your tests

import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    expect(getBankAccount(initialBalance).getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const moreBalance = 1500;

    const bankAccount = getBankAccount(initialBalance);

    const withdraw = () => bankAccount.withdraw(moreBalance);

    expect(withdraw).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const transferBalance = 1500;

    const fromBankAccount = getBankAccount(initialBalance);
    const toBankAccount = getBankAccount(initialBalance);

    const transfer = () =>
      fromBankAccount.transfer(transferBalance, toBankAccount);

    expect(transfer).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;
    const transferBalance = 1500;

    const bankAccount = getBankAccount(initialBalance);

    const transfer = () => bankAccount.transfer(transferBalance, bankAccount);

    expect(transfer).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const deposit = 1500;
    const depositMoney = getBankAccount(initialBalance).deposit(deposit);
    const balanceAfterDeposit = depositMoney.getBalance();

    expect(balanceAfterDeposit).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const withdrawSum = 500;
    const withDrawMoney = getBankAccount(initialBalance).withdraw(withdrawSum);
    const balanceAfterWithdraw = withDrawMoney.getBalance();

    expect(balanceAfterWithdraw).toBe(initialBalance - withdrawSum);
  });

  test('should transfer money', () => {
    const initialFromBalance = 1000;
    const initialToBalance = 500;

    const transferBalance = 700;

    const fromBankAccount = getBankAccount(initialFromBalance);
    const toBankAccount = getBankAccount(initialToBalance);

    fromBankAccount.transfer(transferBalance, toBankAccount);

    const resultFromBalance = fromBankAccount.getBalance();
    const resultToBalance = toBankAccount.getBalance();

    expect(resultFromBalance).toEqual(initialFromBalance - transferBalance);
    expect(resultToBalance).toEqual(initialToBalance + transferBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const mockedValue = 200;

    const spy = jest.spyOn(bankAccount, 'fetchBalance');
    spy.mockResolvedValue(mockedValue);

    await expect(bankAccount.synchronizeBalance()).resolves.not.toThrow(
      SynchronizationFailedError,
    );

    spy.mockReset();
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const mockedValue = 200;

    const spy = jest.spyOn(bankAccount, 'fetchBalance');
    spy.mockResolvedValue(mockedValue);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(mockedValue);

    spy.mockReset();
    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const mockedValue = null;

    const spy = jest.spyOn(bankAccount, 'fetchBalance');
    spy.mockResolvedValue(mockedValue);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    spy.mockReset();
    spy.mockRestore();
  });
});
