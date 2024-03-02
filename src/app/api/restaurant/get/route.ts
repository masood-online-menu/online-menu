import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const restaurant = await prisma.resturant.findMany();

    return NextResponse.json(restaurant);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
