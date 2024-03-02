import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

export default function AdminForm() {
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('لطفا نام کاربری خود را وارد کنید'),
    password: Yup.string()
      .label('کلمه عبور')
      .required('لطفا رمز عبور خود را وارد کنید')
      .min(8)
      .max(128),
    expireDate: Yup.date(),
    phoneNumber: Yup.string(),
    userType: Yup.string(),
  });

  const defaultValues = {
    username: '',
    password: '',
    expireDate: new Date(),
    phoneNumber: '',
    userType: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/auth/register', data);
      toast.success('حساب کاربری با موفقیت ایجاد شد');
      router.push('/auth');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5}>
        <RHFTextField name="username" label="نام کاربری " />
        <RHFTextField name="password" type="password" label="نام رمزعبور " />
        <Controller
          render={({ field }) => (
            <DatePicker
              {...field}
              label="تاریخ انقضا"
              views={['year', 'month', 'day']}
            />
          )}
          control={control}
          name="expireDate"
        />

        <RHFTextField name="phoneNumber" label="شماره تلفن" />
        <RHFTextField name="userType" label="نوع کاربر" />
        <LoadingButton
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          sx={{ fontFamily: 'IranSans' }}
          loading={isSubmitting}
        >
          ورود به حساب کاربری
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
