'use client';

import React, {useEffect, useRef} from 'react';
import {Toaster, toast} from 'sonner';

export default function SonnerToast({status, message, condition}) {
  const lastToastRef = useRef({status: '', message: ''});

  useEffect(() => {
    if (status && message) {
      const isNewToast = status !== lastToastRef.current.status || message !== lastToastRef.current.message;
      if (isNewToast) {
        toast(message, {type: status});
        lastToastRef.current = {status, message};
        if (typeof condition === 'function') {
          condition();
        }
      }
    }
  }, [status, message, condition]);

  return (
    <Toaster
      position='bottom-center'
      expand={false}
      richColors
      theme='light'
      toastOptions={{
        style: {
          border: '1px solid black',
          padding: '12px',
        },
        duration: 3000,
      }}
    />
  );
}
