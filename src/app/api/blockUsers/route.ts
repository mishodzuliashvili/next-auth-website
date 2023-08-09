import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session: any = await getServerSession(authOptions);
  if (!session || session.status === "blocked") {
    return NextResponse.redirect(new URL("/login"));
  }
  const { selectedUsers } = await request.json();
  await prisma.users.updateMany({
    where: {
      id: {
        in: selectedUsers,
      },
    },
    data: {
      status: "blocked",
    },
  });
  return NextResponse.json({
    authenticated: true,
    session,
  });
}
