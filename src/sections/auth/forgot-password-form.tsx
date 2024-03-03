import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
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
  setUser: (number: string) => void;
  setStep: () => void;
}
export default function ForgotPasswordForm(props: Props) {
  const { user, setUser, setStep } = props;

  const ForgotPasswordSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('لطفا شماره موبایل خود را وارد کنید')
      .min(10, 'لطفا شماره موبایل خود را بدون صفر وارد کنید')
      .max(10, 'لطفا شماره موبایل خود را بدون صفر وارد کنید'),
  });

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      phoneNumber: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios
        .post('/api/auth/forgot/sendOtp', {
          phoneNumber: data.phoneNumber,
          otp: user.otp,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(data.phoneNumber);
            setStep();
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
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <RHFTextField
        name="phoneNumber"
        label="شماره موبایل"
        sx={{ mt: 3 }}
        inputMode="numeric"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 3, fontFamily: 'IranSans' }}
        fullWidth
      >
        ارسال کد
      </Button>
    </FormProvider>
  );
}
