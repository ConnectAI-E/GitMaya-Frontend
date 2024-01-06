import { useRef, useEffect } from 'react';
import { isEmpty } from 'lodash-es';

export const useDialog = ({
  url,
  option = 'left=500,top=300,width=480,height=640',
  event,
  callback,
}: {url: string, option?: string, event: string, callback: (data: any) => null}) => {
  const dialog = useRef<Window | null>();
  const eventListener = (e) => {
    if (e.data?.event === event && !isEmpty(e.data?.data)) {
      // 立即关闭弹窗，之前后端写了一个3s延时
      if (dialog.current) {
        dialog.current.close();
      }
      callback && callback(e.data);
      // 移除事件
      window.removeEventListener('message', eventListener);  
    }
  }
  useEffect(() => {
    window.addEventListener('message', eventListener);
  }, []);
  return () => {
    dialog.current = window.open(url, '', option);
  };
};
