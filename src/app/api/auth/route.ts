import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    if (!username || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const user = await prisma.user.findFirst({
      include: {
        restaurant: true,
      },
      where: {
        username,
      },
    });
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return new NextResponse('Invalid password or username', { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
