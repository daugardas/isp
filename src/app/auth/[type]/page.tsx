import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";
import { auth } from "@/lib/auth";

enum AuthType {
  signIn = "signin",
  signUp = "signup",
}

export default async function Page({ params }: { params: { type: AuthType } }) {
  const session = await auth();
  if (session) redirect("/");

  if (params.type !== AuthType.signIn && params.type !== AuthType.signUp)
    redirect(`/auth/${AuthType.signIn}`);

  return (
    <div className="flex flex-col max-w-xs bg-zinc-900 h-fit">
      <div className="grid grid-cols-2 w-full">
        <Link
          href={`/auth/${AuthType.signIn}`}
          className={`flex justify-center items-center p-4 ${
            params.type === AuthType.signIn
              ? "bg-green-600"
              : "bg-zinc-900 text-zinc-600"
          }`}
        >
          Prisijungti
        </Link>
        <Link
          href={`/auth/${AuthType.signUp}`}
          className={`flex justify-center items-center p-4 ${
            params.type === AuthType.signUp
              ? "bg-green-600"
              : "bg-zinc-900 text-zinc-600"
          }`}
        >
          Užsiregistruoti
        </Link>
      </div>
      {params.type === AuthType.signIn ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}
