"use client";
import { useState } from "react";
import { MinimizedModulis } from "../api/moduliai/search/route";
import Search from "./Search";
import { auth } from "@/lib/auth";
import Link from "next/link";

type ModuliaiProps = {
  moduliai: MinimizedModulis[];
};

export default function Moduliai({ moduliai }: ModuliaiProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  let loggedIn = true;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {loggedIn && (
        <div className="flex flex-row gap-2">
          <div>
            <Link
              href="/moduliai/add"
              className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-100"
            >
              Pridėti modulį
            </Link>
          </div>
        </div>
      )}
      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl mb-4">Moduliai</h1>
      <div>
        {moduliai
          .filter((moduliai) => moduliai.pavadinimas.includes(search))
          .map((moduliai) => (
            <Link
              key={moduliai.id}
              className="w-full py-2 flex text-neutral-300 bg-zinc-900 hover:bg-zinc-800 border border-none rounded-full justify-center hover:text-white transition duration-50"
              href={`/moduliai/${moduliai.id}`}
            >
              {moduliai.pavadinimas}
            </Link>
          ))}
      </div>
    </div>
  );
}
