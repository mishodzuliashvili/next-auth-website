import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

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

  return NextResponse.json({
    authenticated: true,
    session,
  });
}
