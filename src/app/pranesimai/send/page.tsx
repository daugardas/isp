import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return <div>Pranesimu siuntimo psl</div>;
}
