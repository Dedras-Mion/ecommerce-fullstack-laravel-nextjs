'use client';

import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Phone} from 'lucide-react';
import {useFormState} from 'react-dom';

import {AuthActionLogin} from '@/src/actions/AuthAction';
import SubmitButton from '../button/submitButton/SubmitButton';

export default function LoginForm({setStep}) {
  const [stateLogin, formActionLogin] = useFormState(AuthActionLogin, {});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (stateLogin?.message && stateLogin?.status) {
      toast(stateLogin.message, {type: stateLogin.status});
      if (stateLogin.status === 'success') {
        setStep(2);
      }
    }
  }, [stateLogin, setStep]);

  const handlePhoneChange = (e) => {
    setIsFormValid(e.target.value.trim() !== '');
  };

  return (
    <div>
      <div className='px-4 md:px-6'>
        <div className='relative flex min-h-screen flex-col justify-center overflow-hidden py-12'>
          <div className='relative mx-auto w-full max-w-lg rounded-2xl bg-black px-6 pb-9 pt-10 shadow-xl'>
            <div className='mx-auto flex w-full max-w-md flex-col space-y-14'>
              <div className='flex flex-col items-center justify-center space-y-2 text-center'>
                <div className='text-3xl font-semibold'>
                  <p>Phone Verification</p>
                </div>
                <div className='flex flex-row text-sm font-medium text-gray-400'>
                  <p>Enter your mobile number</p>
                </div>
              </div>
              <div>
                <form action={formActionLogin}>
                  <div className='flex flex-col justify-center space-y-10'>
                    <div className='mx-auto flex w-full max-w-xs flex-row items-center justify-center'>
                      <label htmlFor='Phone' className='input input-bordered flex items-center gap-2'>
                        <Phone className='size-4' />
                        <input
                          id='Phone'
                          type='text'
                          className='grow'
                          placeholder='Phone Number'
                          name='cellphone'
                          onChange={handlePhoneChange}
                        />
                      </label>
                    </div>
                    <div className='flex flex-col space-y-5'>
                      <div className='flex justify-center'>
                        <SubmitButton title='Login' style='btn btn-wide btn-neutral' isFormValid={isFormValid} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
