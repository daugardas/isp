"use client";
import { useState } from "react";
import { MinimizedModulis } from "../api/moduliai/search/route";
import Search from "./Search";
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

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl mb-4">Moduliai</h1>
      <div>
        {moduliai
          .filter((moduliai) => moduliai.pavadinimas.includes(search))
          .map((moduliai) => (
            <Link key={moduliai.id} href={`/moduliai/${moduliai.id}`}>
              {moduliai.pavadinimas}
            </Link>
          ))}
      </div>
    </div>
  );
}
