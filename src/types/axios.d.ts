/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ResponseData<T> {
  data: T;
  code: number;
  msg: string;
  total?: number;
}

export interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = ResponseData<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  delete<T = any, R = ResponseData<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  post<T = any, R = ResponseData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  put<T = any, R = ResponseData<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
