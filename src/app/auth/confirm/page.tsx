import { redirect } from "next/navigation";
import ConfirmEmailForm from "./ConfirmEmailForm";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function ConfirmEmailPage() {
  const session = await auth();
  if (session) redirect("/");

  const cookieStore = cookies();
  const confirmEmailCookie = cookieStore.get("confirmEmail");
  if (!confirmEmailCookie) redirect("/auth/signup");

  const email = confirmEmailCookie.value;

  return (
    <div className="">
      <h1 className=" text-xl font-semibold">
        Įveskite kodą, kurį gavote į <span className="font-bold">{email}</span>
      </h1>
      <ConfirmEmailForm />
    </div>
  );
}
