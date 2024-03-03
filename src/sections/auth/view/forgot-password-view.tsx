'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import ForgotPasswordForm from '../forgot-password-form';
import ForgotPasswordOtpForm from '../forgot-password-otp-form';
import ForgotPasswordReset from '../forgot-password-reset';

const OTP = `${Math.floor(100000 + Math.random() * 900000)}`;

export default function ForgotPasswordView() {
  const [step, setStep] = React.useState(1);
  const [user, setUser] = React.useState({
    phoneNumber: '',
    otp: OTP,
  });

  console.log(OTP);
  return (
    <Stack>
      <Typography variant="h4">رمز عبور خود را فراموش کرده اید ؟</Typography>
      {step === 1 && (
        <ForgotPasswordForm
          user={user}
          setUser={(number) => setUser({ ...user, phoneNumber: number })}
          setStep={() => setStep(step + 1)}
        />
      )}
      {step === 2 && (
        <ForgotPasswordOtpForm user={user} setStep={() => setStep(step + 1)} />
      )}
      {step === 3 && <ForgotPasswordReset phoneNumber={user.phoneNumber} />}
    </Stack>
  );
}
