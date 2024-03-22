'use client';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {useFormState} from 'react-dom';
import SubButton from '../button/submitButton/SubmitButton';
import {AuthActionResendOtp} from '@/src/actions/AuthAction';

export default function ResendOtp() {
  const [stateResendOtp, formActionResendOtp] = useFormState(AuthActionResendOtp, {});

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (stateResendOtp?.message && stateResendOtp?.status) {
      toast(stateResendOtp.message, {type: stateResendOtp.status});
    }
    if (stateResendOtp?.status === 'success') {
      setMinutes(1);
      setSeconds(30);
    }
  }, [stateResendOtp]);

  // handle for time resend otp
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  return (
    <div className='mt-4 flex flex-row items-center justify-center space-x-1 p-2 text-center text-sm font-medium text-gray-500'>
      {seconds > 0 || minutes > 0 ? (
        <div>
          <span className='countdown'>
            <span style={{'--value': minutes}}></span>:<span style={{'--value': seconds}}></span>
          </span>
        </div>
      ) : (
        <form className='flex gap-2' action={formActionResendOtp}>
          <p>Did not receive the code?</p>
          <SubButton
            title='Resend'
            style='flex flex-row items-center text-blue-600 hover:text-red-500'
            isFormValid={true}
          />
        </form>
      )}
    </div>
  );
}
