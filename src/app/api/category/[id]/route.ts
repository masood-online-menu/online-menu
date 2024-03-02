import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = req.url;
  const id = url.split('/');
  const os = id[5];
  try {
    if (!id) {
      return new NextResponse('Missing info', { status: 400 });
    }
    const product = await prisma.category.findUnique({
      include: { products: true },
      where: {
        id: os,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
