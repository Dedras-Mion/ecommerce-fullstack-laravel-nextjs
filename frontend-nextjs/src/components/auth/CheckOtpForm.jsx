'use client';
import {useEffect, useRef, useState, useContext} from 'react';
import {toast} from 'sonner';
import {useFormState} from 'react-dom';
import SubButton from '../button/submitButton/SubmitButton';
import {AuthActionOtp} from '@/src/actions/AuthAction';
import {AuthContext} from '@/src/context/AuthContext';
import ResendOtp from './ResendOtp';
import {useRouter} from 'next/navigation';

export default function CheckOtpForm() {
  const [stateOtp, formActionOtp] = useFormState(AuthActionOtp, {});
  const {loginContext} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (stateOtp?.message && stateOtp?.status) {
      toast(stateOtp.message, {type: stateOtp.status});
      if (stateOtp.status === 'success' && stateOtp.user) {
        loginContext(stateOtp.user);
        router.push('/');
      }
    }
  }, [stateOtp, loginContext, router]);

  // State for individual OTP digits and the complete OTP string
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpString, setOtpString] = useState('');
  const inputsRef = useRef([]);

  // New state to track if the form is valid (all OTP digits filled)
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    const newOtpString = newOtp.join('');
    setOtpString(newOtpString);

    // Check if all OTP digits are filled
    setIsFormValid(newOtpString.length === 6);

    // Focus the next input
    if (element.value !== '' && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && otp[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center py-12'>
      <div className='mx-auto w-full max-w-md rounded-2xl bg-black px-6 pb-9 pt-10 shadow-xl'>
        <p className='mb-4 flex justify-center py-4'>Enter the one-time use code</p>

        <form action={formActionOtp}>
          <div className='mb-4 flex justify-center space-x-2'>
            {otp.map((data, index) => (
              <input
                key={index}
                type='text'
                maxLength={1}
                className='otp-input h-12 w-12 rounded-md border border-gray-300 text-center text-2xl focus:border-indigo-500 focus:outline-none'
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <input type='hidden' name='otp' value={otpString} />
          <div className='mt-8 flex justify-center'>
            <SubButton title='Submit' style='btn btn-wide' isFormValid={isFormValid} />
          </div>
        </form>
        <ResendOtp />
      </div>
    </div>
  );
}
