import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  
  return (
      <div className="flex flex-col items-start justify-center h-screen text-gray-500">
        <Link href="/pranesimai/send" className="hover:text-black transition duration-300">Siūsti pranešimą</Link>
        <Link href="/pranesimai/delete" className="hover:text-black transition duration-300">Trinti pranešimą</Link>
        <Link href="/pranesimai/settings" className="hover:text-black transition duration-300">Pranešimų nustatymai</Link>
        {/* <Link href="/pranesimai/module" className="mt-4 underline text-blue-600">Matematika1</Link> */}
      </div>
  );
}