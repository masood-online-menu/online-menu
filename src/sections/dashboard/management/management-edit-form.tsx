import Iconify from '@/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { s3UplaodAction } from '../../../../actions/S3BucketAction';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFAutocomplete, RHFTextField } from '@/components/hook-form';
import axios from 'axios';
import { RestaurantType } from '@/@types/restaurant/restaurantType';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SettingState, setColor } from '@/redux/slices/setting';
import { RootState } from '@/redux/store/store';
import { useAuthContext } from '@/auth/hooks';
import { setRestaurant } from '@/redux/slices/restaurant';

const colorOptions = [
  {
    label: 'آبی تیره',
    value: 'primary',
  },
  {
    label: 'نارنجی',
    value: 'secondary',
  },
  {
    label: 'قرمز',
    value: 'error',
  },
  {
    label: 'زرد',
    value: 'warning',
  },
  {
    label: 'آبی کمرنگ',
    value: 'info',
  },
  {
    label: 'سبز',
    value: 'success',
  },
];

export default function ManagementEditForm() {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageAvalibal, setIsImageAvalibal] = useState(false);
  const [isImagePath, setIsImagePath] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState<RestaurantType | null>(
    null
  );
  const color = useSelector((state: RootState) => state.setting.color);
  const dispatch = useDispatch();
  const restaurantState = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );

  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    if (!restaurantState) {
      setRestaurantData(user?.restaurant[0]);
    } else {
      setRestaurantData(restaurantState);
    }
    setIsLoading(false);
  }, [user, restaurantState]);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const RestaurantSchema = Yup.object().shape({
    name: Yup.string().required('نباید نام رستوران خالی باشد'),
    slogan: Yup.string(),
    image: Yup.string().required('نباید تصویر رستوران خالی باشد'),
    phone: Yup.string(),
    address: Yup.string(),
    instagram: Yup.string(),
    workTime: Yup.string(),
    color: Yup.string(),
    colorObj: Yup.object(),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: restaurantData?.name || '',
      slogan: restaurantData?.slogan || '',
      image: restaurantData?.image || '',
      phone: restaurantData?.phone || '',
      address: restaurantData?.address || '',
      instagram: restaurantData?.instagram || '',
      workTime: restaurantData?.workTime || '',
      colorObj: colorOptions.filter((i) => i.value === restaurantData?.color)[0]
        ?.label || {
        label: 'آبی تیره',
        value: 'primary',
      },
    }),
    [restaurantData]
  );

  const methods = useForm({
    resolver: yupResolver(RestaurantSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (restaurantData) {
      reset(defaultValues);
      setIsImageAvalibal(true);
      setIsImagePath(restaurantData?.image);
    }
  }, [restaurantData, defaultValues, reset]);

  //upload
  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setUploadLoading(true);
    const data = new FormData();
    data.append('file', e.target.files![0]);
    const res = await s3UplaodAction(data);
    if (res.success) {
      setIsImagePath(res.imagePath);
      setValue('image', res.imagePath);
      setIsImageAvalibal(true);
      setUploadLoading(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (restaurantData && restaurantData.id) {
        const res = await axios.post('/api/restaurant/update', {
          name: data.name,
          slogan: data.slogan,
          image: data.image,
          phone: data.phone,
          address: data.address,
          instagram: data.instagram,
          workTime: data.workTime,
          color: data.colorObj.value,
          id: restaurantData?.id,
          userId: user?.id,
        });
        toast.success('با موفقیت ذخیره شد');
        dispatch(setColor(data.colorObj.value));
        console.log(res);
        dispatch(setRestaurant(res.data?.restaurant?.[0]));
      } else {
        const res = await axios.post('/api/restaurant/create', {
          name: data.name,
          slogan: data.slogan,
          image: data.image,
          phone: data.phone,
          address: data.address,
          instagram: data.instagram,
          workTime: data.workTime,
          color: data.colorObj.value,
          userId: user?.id,
        });
        toast.success('با موفقیت ذخیره شد');
        dispatch(setColor(data.colorObj.value));
        dispatch(setRestaurant(res.data.restaurant[0]));
      }
    } catch (err) {
      console.error(err);
      toast.error('خطایی رخ داده است');
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {isLoading && (
        <Stack
          sx={{
            width: 1,
            height: 1,
            zIndex: 3,
            position: 'absolute',
            top: 0,
            left: 0,
            bgcolor: '#00000090',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="success" />
        </Stack>
      )}
      <Stack sx={{ width: 1 }} alignItems="center">
        <Stack
          sx={{
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Stack
            sx={{
              display: isHovered ? 'block' : 'none',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              transition: 'all 0.3s ease',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              width={1}
              height={1}
            >
              <Button
                fullWidth
                component="label"
                role={undefined}
                tabIndex={-1}
                size="large"
                sx={{ fontFamily: 'IranSans' }}
              >
                <Iconify icon="bi:camera-fill" color={'white'} width={40} />
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png, image/gif"
                  hidden
                  onChange={uploadImage}
                />
              </Button>
            </Stack>
          </Stack>
          <Image
            src={isImagePath || '/assets/images/images/RLogo.jpg'}
            alt="logo"
            width={200}
            height={200}
          />
        </Stack>
        {errors.image?.type === 'required' && (
          <FormHelperText error sx={{ fontFamily: 'IranSans' }}>
            لطفا یک تصویر را انتخاب کنید
          </FormHelperText>
        )}
        <Grid container spacing={2} sx={{ my: 3 }}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="name" label="نام رستوران" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="slogan" label="شعار رستوران" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="phone" label="شماره تماس رستوران" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField
              name="instagram"
              label="آدرس اینستاگرام رستوران"
              helperText="مثال: restaurantGreen"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField
              name="workTime"
              label="تایم کاری رستوران"
              helperText="مثال: شنبه تا جمعه از 9 صبح تا 11 شب"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFAutocomplete
              name="colorObj"
              options={colorOptions}
              label="رنگ قالب رستوران"
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box
                    component="span"
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: `${option.value}.main`,
                      borderRadius: '50%',
                      display: 'inline-block',
                      mr: 1,
                    }}
                  />
                  {option.label}
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFTextField
              name="address"
              label="آدرس رستوران"
              multiline
              rows={5}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{ fontFamily: 'IranSans' }}
          fullWidth
          color={color}
        >
          به روز رسانی
        </Button>
      </Stack>
    </FormProvider>
  );
}
