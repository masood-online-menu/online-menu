import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, otp } = body;
    if (!phoneNumber || !otp) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        phoneNumber:`0${phoneNumber}`,
      },
    });
    if (!user) {
      console.log(user);
      return NextResponse.json(
        {
          data: { message: 'User not found', status: 404 },
        },
        { status: 404 }
      );
    }

    const Data = JSON.stringify({
      mobile: phoneNumber,
      templateId: 100000,
      parameters: [{ name: 'CODE', value: otp }],
    });
    const sendOtp = await axios.post(
      'https://api.sms.ir/v1/send/verify',
      Data,
      {
        headers: {
          'x-api-key':
            'CbtDuSAExSo8FHCUY2z4da3iqDQAQeBhvJiqSeqpQnuecf4VLLxsBq3s6jllbyso',
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
      }
    );

    return NextResponse.json({
      data: { message: sendOtp.data.message, status: 200 },
    });
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
