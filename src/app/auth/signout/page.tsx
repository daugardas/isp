import { auth } from "@/lib/auth";
import SignOut from "./SignOut";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div>
      <SignOut />
    </div>
  );
}
