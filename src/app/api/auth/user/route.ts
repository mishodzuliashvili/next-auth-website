import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(
      JSON.stringify({
        authenticated: false,
        status: "fail",
        message: "You are not logged in",
      }),
      { status: 401 }
    );
  }
  const user = await prisma.users.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      last_login_time: true,
      registration_time: true,
    },
  });
  return NextResponse.json({
    user,
  });
}
