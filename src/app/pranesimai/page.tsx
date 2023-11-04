import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/pranesimai/send">Siusti</Link>
      {/* <Link href="/pranesimai/module" className="mt-4 underline text-blue-600">Matematika1</Link> */}
    </div>
  );
}
