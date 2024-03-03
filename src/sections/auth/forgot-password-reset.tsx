import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { paths } from '@/routes/paths';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface Props {
  phoneNumber: string;
}
export default function ForgotPasswordReset(props: Props) {
  const { phoneNumber } = props;
  const router = useRouter();
  const ForgotPasswordResetSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
      .max(128, 'رمز عبور باید حداکثر 128 کاراکتر باشد')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'رمز عبور باید حداقل شامل یک حرف و یک عدد باشد'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordResetSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post('/api/auth/forgot/resetPassword', {
        phoneNumber: phoneNumber,
        password: data.password,
      });
      toast.success('رمز عبور شما با موفقیت تغییر کرد');
      router.push(paths.auth);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ mt: 3 }}>
        <RHFTextField name="password" label="رمز عبور جدید" />
        <RHFTextField name="confirmPassword" label="تکرار رمز عبور جدید" />
        <Button
          type="submit"
          variant="contained"
          sx={{ fontFamily: 'IranSans' }}
          disabled={isSubmitting}
        >
          تغییر رمز عبور
        </Button>
      </Stack>
    </FormProvider>
  );
}
