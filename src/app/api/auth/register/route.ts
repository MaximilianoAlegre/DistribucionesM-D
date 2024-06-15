import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/libs/db.users';

interface UserData {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: UserData = await request.json();

    const userFound = await db.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await db.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: 'Username already exists',
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }
}
