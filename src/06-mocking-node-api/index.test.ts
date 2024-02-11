import * as path from 'path';
import * as fs from 'fs';
import * as fspromises from 'fs/promises';

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const timeout = 1000;
    const cb = () => null;

    doStuffByTimeout(cb, timeout);

    expect(spy).toHaveBeenLastCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const cb = jest.fn();

    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const interval = 1000;
    const cb = () => null;

    doStuffByInterval(cb, interval);

    expect(spy).toHaveBeenLastCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const cb = jest.fn();

    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval * 4);

    expect(cb).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = '/file.txt';
    const joinPathMock = path.join as jest.Mock;
    const existsSyncFSMock = fs.existsSync as jest.Mock;

    existsSyncFSMock.mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(joinPathMock).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/file.txt';
    const existsSyncFSMock = fs.existsSync as jest.Mock;

    existsSyncFSMock.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = '/file.txt';
    const existsSyncFSMock = fs.existsSync as jest.Mock;
    const readFileFSPromisesMock = fspromises.readFile as jest.Mock;
    const fileContent = 'Hello wrld';

    existsSyncFSMock.mockReturnValue(true);
    readFileFSPromisesMock.mockReturnValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
