"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import Search from "./Search";
import { Atsiliepimas, IvertinimoTipas } from "@prisma/client";

type ExpectedDataType = {
  id: number;
  atsiliepimas: string;
  destytojasId: number | null;
};

type AtsiliepimaiProps = {
  atsiliepimai: ExpectedDataType[];
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
            <div
              key={atsiliepimas.id}
              className="w-full py-3 text-black-700 bg-red-700 hover:bg-blue-300 border border-blue-400 rounded-md text-center hover:text-white transition duration-300"
            >
              <Link
                href={`/destytojai/${atsiliepimas.destytojasId}/review/${atsiliepimas.id}`}
              >
                {atsiliepimas.atsiliepimas}
              </Link>
            </div>
          ))}
        {/* Single "Atgal" link outside the map loop */}
        <div className="w-full">
          <Link href={`/destytojai`}>Atgal</Link>
        </div>
      </div>
    </div>
  );
}
