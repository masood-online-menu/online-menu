import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import Timer from '@/utils/countdown';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface Props {
  user: {
    phoneNumber: string;
    otp: string;
  };
  setStep: () => void;
}
export default function ForgotPasswordOtpForm(props: Props) {
  const { user, setStep } = props;
  const OtpFormSchema = Yup.object().shape({
    otp: Yup.string()
      .required('لطفا کد ارسالی را وارد کنید')
      .min(6, 'کد ارسالی باید 6 کاراکتر باشد')
      .max(6, 'کد ارسالی باید کمتر از 6 کاراکتر باشد')
      .matches(/^[0-9]+$/, 'لطفا کد ارسالی را به صورت عدد وارد کنید'),
  });

  const methods = useForm({
    resolver: yupResolver(OtpFormSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (data.otp === user.otp) {
      setStep();
    } else
      setError('otp', {
        type: 'manual',
        message: 'کد ارسالی اشتباه است',
      });
  });

  const handleResendCode = async () => {
    try {
      await axios
        .post('/api/auth/forgot/sendOtp', {
          phoneNumber: user.phoneNumber,
          otp: user.otp,
        })
        .then((res) => {
          if (res.status === 200) {
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            toast.error('کابری با این شماره یافت نشد');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider onSubmit={onSubmit} methods={methods}>
      <Typography sx={{ mt: 2 }}>
        کد برای 0{user?.phoneNumber} ارسال شد
      </Typography>
      <RHFTextField
        name="otp"
        label="کد ارسالی"
        placeholder="- - - - - -"
        sx={{ mt: 3 }}
        inputMode="numeric"
      />
      <Timer time={120} onResend={handleResendCode} />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 3, fontFamily: 'IranSans' }}
        fullWidth
      >
        اعتبار سنجی
      </Button>
    </FormProvider>
  );
}
