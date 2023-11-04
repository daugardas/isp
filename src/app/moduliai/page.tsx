import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/moduliai/add">Add</Link>
      <Link href="/moduliai/module" className="mt-4 underline text-blue-600">Matematika1</Link>
    </div>
  );
}
