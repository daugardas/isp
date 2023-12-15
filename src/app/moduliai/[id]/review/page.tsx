'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import { MinimizedAtsiliepimas } from "../../../api/atsiliepimai/search/route";
import Search from "./Search";

type ModuliaiProps = {
  moduliai: MinimizedAtsiliepimas[];
};

export default function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  console.log("Params ID:", id);

  const [atsiliepimai, setAtsiliepimai] = useState<MinimizedAtsiliepimas[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchAtsiliepimadcata = async () => {
      try {
        // Assuming modulisdc is the correct field name in your Atsiliepimas model
        const data = await prisma.atsiliepimas.findMany({
          where: {
            modulisId: parseInt(id),
          },
        });

        console.log("Original Data:", data);

        const transformedData: MinimizedAtsiliepimas[] = data.map((atsiliepimas) => ({
          modulisId: atsiliepimas.modulisId,
          atsiliepimas: atsiliepimas.atsiliepimas
        }));

        console.log("Fetched Atsiliepimai Data:", transformedData);

        setAtsiliepimai(transformedData);
      } catch (error) {
        console.error("Error fetching atsiliepimai:", error);
      }
    };

    fetchAtsiliepimadcata();
  }, [id]);

  const filteredAtsiliepimai = atsiliepimai.filter((atsiliepimas) =>
    atsiliepimas.atsiliepimas.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Fetched Atsiliepimai Data:", filteredAtsiliepimai);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Search search={search} handleSearch={handleSearch} />
      <h1 className="text-2xl mb-4">Atsiliepimai</h1>
      <div>
        {atsiliepimai
          .filter((atsiliepimai) => atsiliepimai.atsiliepimas.includes(search))
          .map((atsiliepimai) => (
            <Link key={atsiliepimai.modulisId} className="w-full py-2 flex text-neutral-300 bg-zinc-900 hover:bg-zinc-800 border border-none rounded-full justify-center hover:text-white transition duration-50" href={`/review/${atsiliepimai.modulisId}`}>
              {atsiliepimai.atsiliepimas}
            </Link>
          ))}
      </div>
    </div>
  );
}