import { useRef, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash-es';

const oauthHost = import.meta.env.VITE_OAUTH_HOST;

export const useOauthDialog = ({
  url,
  option = 'left=500,top=300,width=1024,height=800',
  event,
  callback,
}: {
  url: string;
  option?: string;
  event: string;
  callback: (data: unknown) => void;
}) => {
  const dialog = useRef<Window | null>();
  let _url = '';
  if (oauthHost.length > 0) {
    _url = oauthHost + url;
  }
  else {
    _url = window.location.origin + url;
  }

  const eventListener = useCallback(
    (e: MessageEvent) => {
      if (e.data?.event === event && !isEmpty(e.data?.data)) {
        if (dialog.current) {
          dialog.current.close();
        }
        callback?.(e.data);
        console.log('Oauth message ~ e:', e);
        window.removeEventListener('message', eventListener);
      }
    },
    [event, callback],
  );

  useEffect(() => {
    window.addEventListener('message', eventListener);

    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, [eventListener]);

  return () => {
    dialog.current = window.open(_url, '', option);
  };
};
