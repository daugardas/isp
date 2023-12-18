"use client";
import { useState } from "react";
import { MinimizedDestytojas } from "../api/destytojai/search/route";
import Search from "./Search";
import { auth } from "@/lib/auth";
import Link from "next/link";

type DestytojaiProps = {
  destytojai: MinimizedDestytojas[];
};

export default function Destytojai({ destytojai }: DestytojaiProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  let loggedIn = true;

  return (

    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="flex flex-row gap-2 mb-4">
          <div>
            <Link
              href="/destytojai/monthly"
              className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-100"
            >
              Menėsio dėstytojas
            </Link>
          </div>
        </div>
      {loggedIn && (
        <div className="flex flex-row gap-2">
          <div>
            <Link
              href="/destytojai/add"
              className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-100"
            >
              Pridėti dėstytoją
            </Link>
          </div>
        </div>
      )}
      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl mb-4">Destytojai</h1>
      <div>
        {destytojai
          .filter((destytojai) => destytojai.vardas.includes(search))
          .map((destytojai) => (
            <Link
              key={destytojai.id}
              className="w-full py-2 flex text-neutral-300 bg-zinc-900 hover:bg-zinc-800 border border-none rounded-full justify-center hover:text-white transition duration-50 mb-2 px-4"
              href={`/destytojai/${destytojai.id}`}
            >
              {destytojai.vardas}
            </Link>
          ))}
      </div>
    </div>
  );
}
