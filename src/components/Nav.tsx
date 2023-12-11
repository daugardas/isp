"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  currentPath: boolean;
  children: React.ReactNode;
} & LinkProps;

const NavLink = ({ href, currentPath, children, ...props }: NavLinkProps) => (
  <Link
    className={`h-full px-5 flex justify-center items-center hover:text-white hover:bg-zinc-800 transition duration-100 ${
      currentPath ? "text-neutral-50" : "text-neutral-500"
    }`}
    href={href}
    {...props}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { data, status } = useSession();
  const id = data?.user?.id;
  const pathname = usePathname();
  return (
    <nav className="w-screen h-12 bg-zinc-900 flex justify-center">
      <NavLink href="/" currentPath={pathname === "/"}>
        Pradžia
      </NavLink>
      {status == "authenticated" ? (
        <>
          <NavLink
            currentPath={
              pathname.startsWith("/naudotojai") &&
              pathname !== `/naudotojai/${id}`
            }
            href="/naudotojai"
          >
            Naudotojai
          </NavLink>
          <NavLink
            currentPath={pathname.startsWith("/destytojai")}
            href="/destytojai"
          >
            Dėstytojai
          </NavLink>
          <NavLink
            currentPath={pathname.startsWith("moduliai")}
            href="/moduliai"
          >
            Moduliai
          </NavLink>
          <NavLink
            currentPath={pathname.startsWith("pranesimai")}
            href="/pranesimai"
          >
            Pranešimai
          </NavLink>
          <NavLink
            currentPath={pathname === `/naudotojai/${id}`}
            href={`/naudotojai/${id}`}
          >
            Profilis
          </NavLink>
          <NavLink
            currentPath={pathname.startsWith("/auth/signout")}
            href="/auth/signout"
            scroll={false}
          >
            Atsijungti
          </NavLink>
        </>
      ) : (
        <NavLink
          currentPath={pathname.startsWith("/auth/signin")}
          href="/auth/signin"
        >
          Prisijungti
        </NavLink>
      )}
    </nav>
  );
}
