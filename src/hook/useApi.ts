import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { UseApiProps, UseApiResult } from '../types/api';



const useApi = <T>({ url, initialData, trigger }: UseApiProps<T>): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [apiUrl, setApiUrl] = useState<string>(url);


  const fetchData = async (config?: AxiosRequestConfig) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await axios({ url: apiUrl, ...config });
      setData(response.data);
    } catch (error: unknown) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, trigger]);


  const setUrl = (newUrl: string) => {
    setApiUrl(newUrl);
  };

  const postData = async (data: any, config?: AxiosRequestConfig) => {
    await fetchData({ method: 'POST', data, ...config });
  };

  return { data, isLoading, error, setUrl, postData };
};

export default useApi;
