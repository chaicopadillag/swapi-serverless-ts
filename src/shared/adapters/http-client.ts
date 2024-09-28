import axios, { AxiosInstance } from 'axios';

export class HttpClient {
  private readonly httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
    });
  }

  public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.httpClient.get<T>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const response = await this.httpClient.post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data: any): Promise<T> {
    const response = await this.httpClient.put<T>(url, data);
    return response.data;
  }

  public async patch<T>(url: string, data: any): Promise<T> {
    const response = await this.httpClient.patch<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.httpClient.delete<T>(url);
    return response.data;
  }
}

const httpClient = new HttpClient(process.env.SWAPI_API || 'https://swapi.dev/api');

export default httpClient;
