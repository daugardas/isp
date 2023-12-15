import React, { useEffect, useState } from 'react';
import prisma from "@/lib/db";
import Link from 'next/link';

interface AtsiliepimasData {
  id: number;
  tipas: string; // Replace with your actual type
  atsiliepimas: string;
}

/**
 * Renders a page for Atsiliepimai related to a specific module.
 *
 * @param props.params - The URL parameters.
 * @param props.params.id - The ID of the module to display Atsiliepimai for.
 * @returns - The rendered page.
 */
export default async function Page({
  params,
}: Readonly<{ params: { idd: string } }>) {
  const { idd } = params;
  const [atsiliepimai, setAtsiliepimai] = useState<AtsiliepimasData[]>([]);

  useEffect(() => {
    const fetchAtsiliepimaiData = async () => {
      try {
        const data = await prisma.atsiliepimas.findMany({
          where: {
            modulisId: parseInt(idd),
          },
        });
        setAtsiliepimai(data);
      } catch (error) {
        console.error("Error fetching atsiliepimai:", error);
      }
    };

    fetchAtsiliepimaiData();
  }, [idd]);

  return (
    <div className="mt-6 lg:w-3/12 max-w-lg w-8/12 flex flex-col items-center gap-4">
      <h1 className="text-lg font-bold break-words">Atsiliepimai</h1>
      
      {atsiliepimai.length > 0 ? (
        <ul>
          {atsiliepimai.map((atsiliepimas) => (
            <li key={atsiliepimas.id}>
              <strong>{atsiliepimas.tipas}:</strong> {atsiliepimas.atsiliepimas}
            </li>
          ))}
        </ul>
      ) : (
        <p>Šiam moduliui dar nėra atsiliepimų.</p>
      )}

      <Link href="/moduliai" className="mt-4 underline text-blue-600">
        Atgal
      </Link>
    </div>
  );
}