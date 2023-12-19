import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import AddTutorForm from "./AddTutorForm";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  return <AddTutorForm />;
}
