import React from 'react';

export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <span className='loading loading-spinner loading-lg text-error'></span>
    </div>
  );
}
