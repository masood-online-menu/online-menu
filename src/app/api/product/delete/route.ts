import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      console.log(body);
      return new NextResponse('Missing info', { status: 400 });
    }

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
