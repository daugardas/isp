import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-semibold text-center">Modulių sąrašas</h1>
      </div>
      <div className="p-2 text-center items-center text-1xl font-semibold">
        <Link href="/moduliai/module" className="mt-4 underline text-blue-600 p-1">Matematika1</Link>
      </div>
      <div className="bg-blue-500 text-white p-4 mt-auto">
        <div className="text-center">
          <Link href="/moduliai/add" className="text-1xl font-semibold hover:text-red-700">Pridėti modulį</Link>
        </div>
      </div>      
    </div>
  );
}