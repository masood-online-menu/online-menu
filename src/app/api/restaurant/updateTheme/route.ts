import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, themeId, userId } = body;

    if (!themeId || !id || !userId) {
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
              themeId,
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
