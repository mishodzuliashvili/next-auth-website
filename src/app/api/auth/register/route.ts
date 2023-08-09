import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashed_password = await hash(password, 10);
    const userExists = await prisma.users.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (userExists) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Email already exists",
        }),
        { status: 400 }
      );
    }
    await prisma.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });
    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "User created successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
