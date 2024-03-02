import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slogan,
      image,
      id,
      phone,
      address,
      instagram,
      workTime,
      color,
      userId,
    } = body;

    if (!name || !image || !id || !userId) {
      console.log(body);
      return new NextResponse('Missing info', { status: 400 });
    }

    const product = await prisma.user.update({
      include: {
        restaurant: true,
      },
      where: {
        id: userId,
      },
      data: {
        restaurant: {
          update: {
            where: {
              id,
            },
            data: {
              name,
              slogan,
              image,
              phone,
              address,
              instagram,
              workTime,
              color,
            },
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
