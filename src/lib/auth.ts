import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function updateLastLoginTime(id: string) {
  await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      last_login_time: new Date(),
    },
  });
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!credentials || !email || !password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Email or password is incorrect");
        }
        if (user.status === "blocked") {
          throw new Error("User is blocked");
        }
        updateLastLoginTime(user.id);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          status: user.status,
          last_login_time: user.last_login_time,
          registration_time: user.registration_time,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
};
