import InputWrap from "@/components/InputWrap";
import Link from 'next/link';
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

interface AtsiliepimasData {
  id: number;
  tipas: string;
  atsiliepimas: string;
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
}: Readonly<{ params: { id: string, dc: string } }>) {
  const { id, dc } = params;

  const reviewData = await prisma.atsiliepimas.findUnique({
    where: {
      id: parseInt(dc),
      modulisId: parseInt(id),
    },
  });

  if (!reviewData) {
    return <div>Atsiliepimas nerastas</div>;
  }

  const session = await auth();

  return (
    <div className="mt-6 lg:w-3/12 max-w-lg w-8/12 flex flex-col items-center gap-4">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-lg font-bold break-words">{reviewData.id}</h1>
        </div>
        <InputWrap className="w-full">
          <Label className="font-bold">Atsiliepimas:</Label>
          <p className="text-md break-words">{reviewData.atsiliepimas}</p>
        </InputWrap>
        <InputWrap className="w-full">
          <Label className="font-bold">Atsiliepimo tipas:</Label>
          <p className="text-md break-words">{reviewData.tipas}</p>
        </InputWrap>
        <Link href={`/moduliai/${reviewData.id}/review`} className="mt-4 underline text-blue-600">
            Atgal
        </Link>

    </div>
  );
}