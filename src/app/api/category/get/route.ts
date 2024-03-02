import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const restaurantId = request.headers.get('restaurantId');

  if (!restaurantId) {
    return new NextResponse('Missing info', { status: 400 });
  }
  try {
    const category = await prisma.category.findMany({
      include: { products: true },
      where: {
        resturantId: restaurantId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
