import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      password,
      userType,
      phoneNumber,
      expireDate
    } = body;

    if (!username || !password || !userType || !phoneNumber) {
      console.log(body);
      return new NextResponse('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        phoneNumber,
        userType,
        expireDate,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
