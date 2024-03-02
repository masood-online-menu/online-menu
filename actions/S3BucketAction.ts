'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'default',
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY as string,
    secretAccessKey: process.env.LIARA_SECRET_KEY as string,
  },
});

export async function s3UplaodAction(data: FormData) {
  const file: File | null = data.get('file') as File;
  if (!file) {
    throw new Error('no file');
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const menuImage = `${Date.now()}_${file.name}`;

  const params = {
    Body: buffer,
    Bucket: process.env.LIARA_BUCKET_NAME as string,
    Key: menuImage,
  };
  try {
    await s3.send(new PutObjectCommand(params));
    return {
      success: true,
      imagePath: `https://onlinemenu.storage.iran.liara.space/${menuImage}`,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
}
