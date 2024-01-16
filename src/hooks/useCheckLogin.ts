import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '@/stores';
import { isEmpty } from 'lodash-es';

export const useCheckLogin = (navigateUrl: string = '/app/people') => {
  const account = useAccountStore.use.account();
  const navigate = useNavigate();
  const goto = useCallback(() => {
    if (isEmpty(account)) {
      navigate('/login');
    } else {
      navigate(navigateUrl);
    }
  }, [account, navigate, navigateUrl]);

  return goto;
};
