
import InputWrap from "@/components/InputWrap";
import Link from 'next/link';
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

interface ModuleData {
  id: number;
  pavadinimas: string;
  aprasymas: string;
  kalba: 'lietuviu' | 'anglu'; // Adjust based on your enum values
  kreditai: number;
  kryptisId: number;
  destytojasId: number | null;
}

/**
 * Renders a page for a specific module.
 *
 * @param props.params - The URL parameters.
 * @param props.params.id - The ID of the module to display.
 * @returns - The rendered page.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;

  const moduleData = await prisma.modulis.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!moduleData) {
    return <div>Modulis nerastas</div>;
  }

  const session = await auth();

  return (
    <div className="mt-6 lg:w-3/12 max-w-lg w-8/12 flex flex-col items-center gap-4">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-lg font-bold break-words">{moduleData.pavadinimas}</h1>
        </div>
        <InputWrap className="w-full">
          <Label className="font-bold">Modulio aprašymas:</Label>
          <p className="text-md break-words">{moduleData.aprasymas}</p>
        </InputWrap>
        <InputWrap className="w-full">
          <Label className="font-bold">Kreditų skaičius:</Label>
          <p className="text-md break-words">{moduleData.kreditai}</p>
        </InputWrap>
        <InputWrap className="w-full">
          <Label className="font-bold">Modulio kalba:</Label>
          <p className="text-md break-words">{moduleData.kalba}</p>
        </InputWrap>
        <Link href="/moduliai" className="mt-4 underline text-blue-600">
            Atgal
        </Link>
        <Link href={`/moduliai/${moduleData.id}/ai`} className="text-1xl font-semibold hover:text-red-700">
              Sugeneruoti modulio antraštę
        </Link>
        <Link href={`/moduliai/${moduleData.id}/edit`} className="text-1xl font-semibold hover:text-red-700">
              Koreguoti modulio informaciją
        </Link>
        <Link href={`/moduliai/${moduleData.id}/remove`} className="text-1xl font-semibold hover:text-red-700">
              Modulio ištrinimas
        </Link>
        <Link href={`/moduliai/${moduleData.id}/feedback`} className="text-1xl font-semibold hover:text-red-700">
              Modulio atsiliepimas
        </Link>
    </div>
  );
}