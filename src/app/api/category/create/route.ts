import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image } = body;

    if (!name || !image) {
      console.log(body);
      return new NextResponse('Missing info', { status: 400 });
    }
    const category = await prisma.category.create({
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
