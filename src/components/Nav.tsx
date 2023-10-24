import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-screen h-12 sm:static fixed bg-zinc-900 flex sm:items-center sm:justify-center flex-col">
      <div className="flex flex-row gap-2">
        <Link href="/destytojai">Dėstytojai</Link>
        <Link href="/moduliai">Moduliai</Link>
        <Link href="/pranesimai">Pranešimai</Link>
      </div>
    </nav>
  );
}
