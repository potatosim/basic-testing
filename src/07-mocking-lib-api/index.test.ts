// Uncomment the code below and write your tests
import axios, { Axios } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/users';
  const responseData = [{ firstName: 'John', secondName: 'Doe' }];

  beforeAll(() => {
    jest.mock('axios');
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.advanceTimersByTime(THROTTLE_TIME);
    jest.spyOn(axios, 'create');
    jest
      .spyOn(Axios.prototype, 'get')
      .mockResolvedValue({ data: responseData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(Axios.prototype.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const d = await throttledGetDataFromApi(relativePath);

    expect(d).toEqual(responseData);
  });
});
