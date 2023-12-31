import Link from "next/link";
import LoginForm from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <div className="p-5 flex flex-col gap-3 items-start">
        <h2 className="font-bold text-2xl">Welcome back!</h2>
        <p className="text-tsecondary">
          {"Don't have an account? "}
          <Link className="underline" href="/register">
            Create an account
          </Link>
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
