import { useRef, useEffect } from 'react';
import { isEmpty } from 'lodash-es';

export const useDialog = ({
  url,
  option = 'left=500,top=300,width=480,height=640',
  event,
  callback,
}) => {
  const dialog = useRef<Window | null>();
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data?.event === event && !isEmpty(e.data?.data)) {
        // 立即关闭弹窗，之前后端写了一个3s延时
        if (dialog.current) {
          dialog.current.close();
        }
        callback && callback(e.data);
      }
    });
  }, []);
  return () => {
    dialog.current = window.open(url, '', option);
  };
};
