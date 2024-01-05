import request from '@/utils/request';
import useSWR from 'swr';

export const useUser = () => {
  const { data, error, isLoading } = useSWR('/api/account', request);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
