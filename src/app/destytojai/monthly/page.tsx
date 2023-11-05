import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Mėnesio dėstytojas
    </div>
  );
}
