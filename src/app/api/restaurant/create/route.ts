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
      phone,
      address,
      instagram,
      workTime,
      color,
      userId,
    } = body;

    if (!name || !image || !userId) {
      console.log(body);
      return new NextResponse('Missing info', { status: 400 });
    }

    const restaurant = await prisma.user.update({
      include: {
        restaurant: true,
      },
      where: {
        id: userId,
      },
      data: {
        restaurant: {
          create: {
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
    });
    return NextResponse.json(restaurant);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
