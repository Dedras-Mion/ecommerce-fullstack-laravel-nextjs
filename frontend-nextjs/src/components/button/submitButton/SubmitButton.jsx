'use client';

import {useFormStatus} from 'react-dom';

export default function SubmitButton({title, style, isFormValid}) {
  const {pending} = useFormStatus();

  return (
    <button className={style} disabled={pending || !isFormValid} type='submit'>
      {pending ? <span className='loading loading-dots loading-sm'></span> : title}
    </button>
  );
}
//! Other methods 2
{
  /* <button className="btn btn-wide" disabled={pending}>
        {title}
        {pending && <span class="loading loading-dots loading-sm"></span>}
      </button> */
}
