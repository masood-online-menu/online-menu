import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Grid } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { s3UplaodAction } from '../../../../actions/S3BucketAction';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { CategoryType } from '@/@types/category/categoryType';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

interface Props {
  currentCategory?: CategoryType;
}

export default function CategoryNewEditForm({ currentCategory }: Props) {
  const [isImageAvalibal, setIsImageAvalibal] = useState(false);
  const [isImagePath, setIsImagePath] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);
  const restaurant = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );

  const NewCategorySchema = Yup.object().shape({
    name: Yup.string()
      .required('نام دسته بندی نباید خالی باشد')
      .min(2, 'نام دسته بندی باید بیشتر از دو کاراکتر باشد'),
    image: Yup.string(),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentCategory?.name || '',
      image: currentCategory?.image || '',
    }),
    [currentCategory]
  );

  const methods = useForm({
    resolver: yupResolver(NewCategorySchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    setError,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentCategory) {
      reset(defaultValues);
      setIsImageAvalibal(true);
      setIsImagePath(currentCategory.image);
    }
  }, [currentCategory, defaultValues, reset]);

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

  const resetStates = () => {
    setIsImageAvalibal(false);
    setIsImagePath('');
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentCategory) {
        await axios.post('/api/category/update', {
          id: currentCategory.id,
          name: data.name,
          image: data.image,
        });
        toast.success(`دسته بندی ${data.name} با موفقیت ویرایش شد`);
        resetStates();
        router.push(paths.categories.root);
      } else {
        await axios
          .post('/api/category/create', {
            ...data,
            restaurantId: restaurant.id,
          })
          .then((res) => {
            toast.success(`دسته بندی  ${data.name} با موفقیت اضافه شد`);
            resetStates();
            router.push(paths.categories.root);
          });
      }
    } catch (err) {
      toast.error(`خطایی رخ داده`);
      console.error(err);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RHFTextField name="name" label="نام دسته بندی" />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="large"
            color={color}
          >
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png, image/gif"
              hidden
              onChange={uploadImage}
            />
            آپلود آیکون
          </Button>
        </Grid>
        <Grid item>
          {isImageAvalibal && !uploadLoading && (
            <Image
              src={isImagePath}
              alt={watch('name')}
              width={200}
              height={200}
            />
          )}
          {!isImageAvalibal && uploadLoading && <CircularProgress />}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ fontFamily: 'IranSans', mt: 5 }}
        color={color}
      >
        {currentCategory ? 'ویرایش' : 'ایجاد'} دسته بندی
      </Button>
    </FormProvider>
  );
}
