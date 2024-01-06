import { useRef, useEffect } from 'react';
import { isEmpty } from 'lodash-es';

export const useDialog = ({
  url,
  option = 'left=500,top=300,width=480,height=640',
  event,
  callback,
}) => {
  const loginDialog = useRef<Window | null>();
  useEffect(() => {
    window.addEventListener('message', (e) => {
      console.log('message', e.data);
      if (e.data?.event === event && !isEmpty(e.data?.data)) {
        console.log('message', e.data.data);
        if (loginDialog.current) {
          loginDialog.current.close();
        }
        callback && callback(e.data);
      }
    });
  }, []);
  return () => {
    loginDialog.current = window.open(url, '', option);
  };
};
