import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

let timer = 0;
let state = '';
let activeRequests = 0;
const delay = 1000;

const load = () => {
  if (state !== 'loading') {
    state = 'loading';
    timer = setTimeout(() => {
      NProgress.start();
    }, delay); // only show progress bar if it takes longer than the delay
  }
};

const stop = () => {
  if (activeRequests === 0) {
    state = 'stop';
    clearTimeout(timer);
    NProgress.done();
  }
};

const handleRequest = (activeRequestsChange: number) => {
  activeRequests += activeRequestsChange;
  if (activeRequests === 0) {
    stop();
  }
};

const request = axios.create({
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  if (activeRequests === 0) {
    load();
  }
  activeRequests++;
  return config;
});

request.interceptors.response.use(
  (response) => {
    handleRequest(-1);

    return response.data;
  },
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = '/login';
    }
    handleRequest(-1);
    return Promise.reject(error);
  },
);

export default request;
