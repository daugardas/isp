import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/moduliai/add">Add</Link>
      <Link href="/moduliai/ai">Chat GPT</Link>
      <Link href="/moduliai/edit">Edit</Link>
      <Link href="/moduliai/feedback">Review</Link>
      <Link href="/moduliai/remove">Remove</Link>
    </div>
  );
}
