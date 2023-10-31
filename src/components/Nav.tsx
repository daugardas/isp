import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Nav() {
  const session = await auth();
  return (
    <nav className="w-screen h-12 bg-zinc-900">
      <div className="flex flex-row gap-2">
        <Link href="/destytojai">Dėstytojai</Link>
        <Link href="/moduliai">Moduliai</Link>
        <Link href="/pranesimai">Pranešimai</Link>
        {session && (
          <Link href="/auth/signout" scroll={false}>
            Atsijungti
          </Link>
        )}
      </div>
    </nav>
  );
}
