import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/UsersTable";

async function getUsers() {
  const users = await prisma.users.findMany();
  return users;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const users = await getUsers();
  return (
    <main>
      <div className="p-5 flex flex-col gap-3 items-start">
        <h2 className="font-bold text-2xl">Hello, {session.user?.name}!</h2>
        <p className="text-tsecondary max-w-md">
          This page is only accessible to authenticated users. You can delete,
          block and unblock users here.
        </p>
        <LogoutButton />
        <UsersTable users={users} />
      </div>
    </main>
  );
}
