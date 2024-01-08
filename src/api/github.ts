import request from '@/utils/request';
import useSWR from 'swr';

export const useAccount = () => {
  const { data, error, isLoading } = useSWR<Github.Account>('/api/account', request);

  return {
    data: data?.user,
    isLoading,
    isError: error,
  };
};
