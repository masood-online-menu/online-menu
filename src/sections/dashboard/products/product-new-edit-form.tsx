import { RHFAutocomplete, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { s3UplaodAction } from '../../../../actions/S3BucketAction';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { ProductType } from '@/@types/products/productType';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

interface Props {
  currentProduct?: ProductType;
}
export default function ProductNewEditForm({ currentProduct }: Props) {
  const [isImageAvalibal, setIsImageAvalibal] = useState(false);
  const [isImagePath, setIsImagePath] = useState('');
  const [categories, setCategories] = useState([]);
  const [hasCategory, setHasCategory] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const router = useRouter();
  const color = useSelector((state: RootState) => state.setting.color);


  const resetStates = () => {
    setIsImageAvalibal(false);
    setIsImagePath('');
  };
  const NewProductSchema = Yup.object().shape({
    name: Yup.string()
      .required('نام محصول نباید خالی باشد')
      .min(2, 'نام محصول باید بیشتر از دو کاراکتر باشد'),
    description: Yup.string(),
    image: Yup.string(),
    category: Yup.string(),
    categoryObj: Yup.object(),
    price: Yup.string().required('قیمت نباید خالی باشد'),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      image: currentProduct?.image || '',
      categoryObj: currentProduct?.category || {},
      price: currentProduct?.price || 0,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
      setIsImageAvalibal(true);
      setIsImagePath(currentProduct.image);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    axios.get('/api/category/get').then((res) => {
      console.log(res);
      if (res.data.length === 0) {
        setHasCategory(true);
      } else {
        setCategories(res.data);
        setHasCategory(false);
      }
    });
  }, []);

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
      if (currentProduct) {
        await axios.post('/api/product/update', {
          id: currentProduct.id,
          name: data.name,
          category: data.categoryObj.id || '0',
          price: data.price,
          description: data.description,
          image: data.image,
        });
        toast.success(`محصول ${data.name} با موفقیت ویرایش شد`);
        resetStates();
        router.push(paths.products.root);
      } else {
        await axios.post('/api/product/create', {
          name: data.name,
          category: data.categoryObj.id || '0',
          price: data.price,
          description: data.description,
          image: data.image,
        });
        toast.success(`محصول ${data.name} با موفقیت اضافه شد`);
        resetStates();
        router.push(paths.products.root);
      }
    } catch (error) {
      toast.error(`خطایی رخ داده`);
      console.error(error);
    }
  });

  const handleCategory = () => {
    router.push(paths.categories.new);
  };
  if (hasCategory) {
    return (
      <Stack
        sx={{ p: 2, bgcolor: 'error.lighter', borderRadius: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2" color="common.white">
          برای اضافه کردن محصول ابتدا باید دسته بندی ها را وارد کنید
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ fontFamily: 'IranSans' }}
          onClick={handleCategory}
        >
          رفتن به افزودن دسته بندی ها
        </Button>
      </Stack>
    );
  } else {
    return (
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="name" label="نام محصول" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFAutocomplete
              options={categories || []}
              name="categoryObj"
              label="دسته بندی محصول"
              getOptionLabel={(option: any) => option.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="price" label="قیمت محصول" inputMode="numeric" />
          </Grid>

          <Grid item xs={12}>
            <RHFTextField
              name="description"
              label="توضیحات محصول"
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              size="large"
              sx={{ fontFamily: 'IranSans' }}
              color={color}
            >
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                hidden
                onChange={uploadImage}
              />
              آپلود عکس
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
          {currentProduct ? 'ویرایش' : 'ایجاد'} محصول
        </Button>
      </FormProvider>
    );
  }
}
