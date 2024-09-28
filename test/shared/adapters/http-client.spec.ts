import axios from 'axios';
import { HttpClient } from '../../../src/shared/adapters/http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const baseURL = 'https://api.example.com';

  beforeEach(() => {
    httpClient = new HttpClient(baseURL);
    mockedAxios.create.mockReturnValue(mockedAxios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an axios instance with the correct baseURL', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  describe('get', () => {
    it('should make a GET request and return the data', async () => {
      const url = '/users';
      const params = { id: 1 };
      const responseData = { name: 'John Doe' };
      mockedAxios.get.mockResolvedValue({ data: responseData });

      const result = await httpClient.get(url, params);

      expect(mockedAxios.get).toHaveBeenCalledWith(url, { params });
      expect(result).toEqual(responseData);
    });
  });

  describe('post', () => {
    it('should make a POST request and return the data', async () => {
      const url = '/users';
      const data = { name: 'John Doe' };
      const responseData = { id: 1, name: 'John Doe' };
      mockedAxios.post.mockResolvedValue({ data: responseData });

      const result = await httpClient.post(url, data);

      expect(mockedAxios.post).toHaveBeenCalledWith(url, data);
      expect(result).toEqual(responseData);
    });
  });

  describe('put', () => {
    it('should make a PUT request and return the data', async () => {
      const url = '/users/1';
      const data = { name: 'Jane Doe' };
      const responseData = { id: 1, name: 'Jane Doe' };
      mockedAxios.put.mockResolvedValue({ data: responseData });

      const result = await httpClient.put(url, data);

      expect(mockedAxios.put).toHaveBeenCalledWith(url, data);
      expect(result).toEqual(responseData);
    });
  });

  describe('patch', () => {
    it('should make a PATCH request and return the data', async () => {
      const url = '/users/1';
      const data = { age: 30 };
      const responseData = { id: 1, name: 'John Doe', age: 30 };
      mockedAxios.patch.mockResolvedValue({ data: responseData });

      const result = await httpClient.patch(url, data);

      expect(mockedAxios.patch).toHaveBeenCalledWith(url, data);
      expect(result).toEqual(responseData);
    });
  });

  describe('delete', () => {
    it('should make a DELETE request and return the data', async () => {
      const url = '/users/1';
      const responseData = { message: 'User deleted' };
      mockedAxios.delete.mockResolvedValue({ data: responseData });

      const result = await httpClient.delete(url);

      expect(mockedAxios.delete).toHaveBeenCalledWith(url);
      expect(result).toEqual(responseData);
    });
  });
});
