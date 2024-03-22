'use client';
import CheckOtpForm from '@/src/components/auth/CheckOtpForm';
import LoginForm from '@/src/components/auth/LoginForm';
import {useState} from 'react';

export default function LoginPage() {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step == 1 && <LoginForm setStep={setStep} />}

      {step == 2 && <CheckOtpForm />}
    </div>
  );
}
