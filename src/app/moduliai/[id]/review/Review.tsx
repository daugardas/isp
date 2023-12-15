'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { MinimizedAtsiliepimas } from "../../../api/atsiliepimai/search/route";
import Search from "./Search";

type AtsiliepimaiProps = {
  atsiliepimai: MinimizedAtsiliepimas[];
};

export default function Atsiliepimai({ atsiliepimai }: AtsiliepimaiProps) {


  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-2xl mb-4">Visi atsiliepimai</h1>
      <Search search={search} handleSearch={handleSearch} />
      <div>
        {atsiliepimai
          .filter((atsiliepimai) => atsiliepimai.atsiliepimas.includes(search))
          .map((atsiliepimai) => (
            <Link key={atsiliepimai.id} className="w-full py-2 flex text-neutral-300 bg-zinc-900 hover:bg-zinc-800 border border-none rounded-full justify-center hover:text-white transition duration-50" href={`/moduliai/${atsiliepimai.modulisId}/review/${atsiliepimai.id}`}>
              {atsiliepimai.atsiliepimas}
            </Link>
          ))}
      </div>
    </div>
  );
}