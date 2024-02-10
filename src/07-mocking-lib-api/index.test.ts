import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import * as helper from './helper';

function delay5s() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
    jest.runAllTimers();
  });
}

jest.mock('axios', () => {
  return {
    create: () => {
      return {
        get: helper.get,
      };
    },
  };
});

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    delay5s();
  });

  test('should create instance with provided base url', async () => {
    const spyAxiosCreate = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('');

    expect(spyAxiosCreate).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosGet = jest.spyOn(helper, 'get');
    const relativePath = '/path';

    await throttledGetDataFromApi(relativePath);

    expect(spyAxiosGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('');
    expect(result).toBe(helper.mockData);
  });
});
