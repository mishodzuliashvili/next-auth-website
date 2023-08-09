import Link from "next/link";
import RegisterForm from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <div className="p-5 flex flex-col gap-3 items-start">
        <h2 className="font-bold text-2xl">Register for an account</h2>
        <p className="text-tsecondary">
          {"Have an account? "}
          <Link className="underline" href="/login">
            Sign in
          </Link>
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
