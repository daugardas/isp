"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const { data, status } = useSession();
  const pathname = usePathname();
  const linkClassName =
    "h-full px-5 flex justify-center items-center hover:text-white hover:bg-zinc-800 transition duration-100";
  return (
    <nav className="w-screen h-12 bg-zinc-900 flex justify-center">
      <Link
        className={`${linkClassName} ${
          pathname === "/" ? "text-neutral-50" : "text-neutral-500"
        }`}
        href="/"
      >
        Pradžia
      </Link>
      {status == "authenticated" ? (
        <>
          <Link
            className={`${linkClassName} ${
              pathname === "/naudotojai"
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href="/naudotojai"
          >
            Naudotojai
          </Link>
          <Link
            className={`${linkClassName} ${
              pathname.startsWith("/destytojai")
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href="/destytojai"
          >
            Dėstytojai
          </Link>
          <Link
            className={`${linkClassName} ${
              pathname.startsWith("/moduliai")
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href="/moduliai"
          >
            Moduliai
          </Link>
          <Link
            className={`${linkClassName} ${
              pathname.startsWith("/pranesimai")
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href="/pranesimai"
          >
            Pranešimai
          </Link>
          <Link
            className={`${linkClassName} ${
              pathname.startsWith("/profilis")
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href={`/profilis`}
          >
            Profilis
          </Link>
          <Link
            className={`${linkClassName} ${
              pathname.startsWith("/auth/signout")
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href="/auth/signout"
            scroll={false}
          >
            Atsijungti
          </Link>
        </>
      ) : (
        <>
          <Link
            className={`${linkClassName} ${
              pathname.startsWith("/auth")
                ? "text-neutral-50"
                : "text-neutral-500"
            }`}
            href="/auth/signin"
          >
            Prisijungti
          </Link>
        </>
      )}
    </nav>
  );
}
