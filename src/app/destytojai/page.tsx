import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-semibold text-center">Dėstytojų sąrašas</h1>
      </div>
      <div className="p-2 text-center items-center text-1xl font-semibold flex-grow">
        <Link href="/destytojai/destytojas" className="mt-4 underline text-blue-600 p-1">
          Pavyzdinis dėstytojas
        </Link>
      </div>
      <div className="bg-blue-500 text-white p-4">
        <ul className="flex flex-wrap justify-center">
          <li className="mx-4">
            <Link href="/destytojai/add" className="text-1xl font-semibold hover:text-red-700">
              Pridėti dėstytoją
            </Link>
          </li>
          <li className="mx-4">
            <Link href="/destytojai/monthly" className="text-1xl font-semibold hover:text-red-700">
              Mėnesio dėstytojas
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
