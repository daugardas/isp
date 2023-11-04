"use client";
import { useState } from "react";
import { MinimizedNaudotojas } from "../api/naudotojai/search/route";
import Search from "./Search";
import Link from "next/link";

type NaudotojaiProps = {
  naudotojai: MinimizedNaudotojas[];
};
export default function Naudotojai({ naudotojai }: NaudotojaiProps) {
  const [search, setSearch] = useState("");
  // const [naudotojai, setNaudotojai] = useState<MinimizedNaudotojas[]>([]);
  // useEffect(() => {
  //   fetchNaudotojai();
  // });

  // const fetchNaudotojai = async () => {
  //   const res = await fetch("/api/naudotojai/search", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ searchFor: search }),
  //   });

  //   const { naudotojai } = (await res.json()) as SearchResponse;
  //   setNaudotojai(naudotojai || []);
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
    //fetchNaudotojai();
  };
  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl">Naudotojai</h1>
      <div className="w-5/6 flex flex-col gap-4 items-center">
        {naudotojai
          .filter((naudotojas) => naudotojas.vardas.includes(search))
          .map((naudotojas) => (
            <Link
              key={naudotojas.id}
              className="w-full max-w-2xl py-2 flex bg-zinc-900 hover:bg-zinc-800 border border-none rounded-full justify-center"
              href={`/naudotojai/${naudotojas.id}`}
            >
              {naudotojas.vardas}
            </Link>
          ))}
      </div>
    </>
  );
}
