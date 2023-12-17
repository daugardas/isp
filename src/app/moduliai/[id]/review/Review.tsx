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
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black-100">
      <h1 className="text-3xl font-semibold mb-4">Visi atsiliepimai</h1>
      <Search search={search} handleSearch={handleSearch} />
      <div className="w-full max-w-md mt-4">
        {atsiliepimai
          .filter((atsiliepimas) => atsiliepimas.atsiliepimas.includes(search))
          .map((atsiliepimas) => (
            <div key={atsiliepimas.id} className="w-full py-3 text-black-700 bg-red-700 hover:bg-blue-300 border border-blue-400 rounded-md text-center hover:text-white transition duration-300">
              <Link href={`/moduliai/${atsiliepimas.modulisId}/review/${atsiliepimas.id}`}>
                {atsiliepimas.atsiliepimas}
              </Link>
            </div>
          ))}
        {/* Single "Atgal" link outside the map loop */}
        <div className="w-full">
          <Link href={`/moduliai`}>
            Atgal
          </Link>
        </div>
      </div>
    </div>
  );
}