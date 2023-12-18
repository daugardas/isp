import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ShowMonthTutor from "./ShowMonthTutor";

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  return <ShowMonthTutor tutorId={1} />;
}
