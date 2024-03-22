'use client';

import {useRef, useState} from 'react';
import {useFormState} from 'react-dom';
import SubmitButton from '../button/submitButton/SubmitButton';
import {ContactAction} from '@/src/actions/ContactAction';
import SonnerToast from '../libraries/sonnerToast/SonnerToast';

export default function FormContact() {
  const [state, formAction] = useFormState(ContactAction, {});
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = () => {
    if (formRef.current) {
      const form = formRef.current;
      const isValid = form.name.value && form.email.value && form.subject.value && form.text.value;
      setIsFormValid(isValid);
    }
  };

  const resetFormCondition = () => {
    if (state.status === 'success' && formRef.current) {
      formRef.current.reset();
      setIsFormValid(false);
    }
  };

  return (
    <>
      <form ref={formRef} action={formAction} className='flex w-full flex-col space-y-4' onChange={handleInputChange}>
        <h2 className='mb-1 text-lg font-medium text-white'>Feedback</h2>
        <p className='mb-5 leading-relaxed'>Post-ironic portland shabby chic echo park, banjo fashion axe</p>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-1 text-base leading-8 text-white outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900'
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-1 text-base leading-8 text-white outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900'
        />
        <input
          type='text'
          name='subject'
          placeholder='Subject'
          className='w-full rounded border border-gray-700 bg-gray-800 px-3 py-1 text-base leading-8 text-white outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900'
        />
        <textarea
          name='text'
          placeholder='Message'
          className='h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 px-3 py-1 text-base leading-6 text-white outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900'></textarea>
        <div className='flex justify-center'>
          <SubmitButton title='Send' style='btn btn-wide btn-neutral' isFormValid={isFormValid} />
        </div>
        <p className='mt-3 text-xs text-gray-400 text-opacity-90'>
          Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
        </p>
      </form>
      <SonnerToast status={state.status} message={state.message} condition={resetFormCondition} />
    </>
  );
}
