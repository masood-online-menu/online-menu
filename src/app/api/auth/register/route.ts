import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, expireDate, phoneNumber, userType } = body;
    if (!username || !password || !expireDate || !phoneNumber || !userType) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (userExists) {
      return new NextResponse('Username already exists', { status: 302 });
    }

    const phoneExist = await prisma.user.findFirst({
      where: {
        phoneNumber,
      },
    });
    if (phoneExist) {
      return new NextResponse('Phone number already exists', { status: 302 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        expireDate,
        phoneNumber,
        userType,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
