import FormProvider from '@/components/hook-form/form-provider';
import * as Yup from 'yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFTextField } from '@/components/hook-form';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from '@/auth/hooks';
import toast from 'react-hot-toast';
import { paths } from '@/routes/paths';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { login } = useAuthContext();
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('لطفا نام کاربری خود را وارد کنید'),
    password: Yup.string()
      .label('کلمه عبور')
      .required('لطفا رمز عبور خود را وارد کنید')
      .min(8)
      .max(128),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await login?.(data.username, data.password);
      toast.success('ورود با موفقیت انجام شد.');
      // Cookie.set('Token', user.id);
      console.log(res);
    
      router.push(paths.dashboard);
    } catch (error) {
      console.error(error);
      toast.error('نام کاربری یا رمز عبور اشتباه است');
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5}>
        <RHFTextField name="username" label="نام کاربری خود را وارد کنید" />
        <RHFTextField
          name="password"
          type="password"
          label="نام رمزعبور خود را وارد کنید"
        />
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
