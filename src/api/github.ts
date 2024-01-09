import request from '@/utils/request';

export const getAccount = () => request.get<Github.Account>('/api/account');
