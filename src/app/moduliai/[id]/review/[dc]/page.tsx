import InputWrap from "@/components/InputWrap";

import Link from "next/link";
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
}: Readonly<{ params: { id: string; dc: string } }>) {
  const session = await auth();
  const { id, dc } = params;

  

  if (!session || !session.user) {
    redirect("/");
}

  const reviewData = await prisma.atsiliepimas.findUnique({
    where: {
      id: parseInt(dc),
      modulisId: parseInt(id),
    },
  });

  const moduleData = await prisma.modulis.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!reviewData) {
    return <div>Atsiliepimas nerastas</div>;
  }


  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="lg:w-2/3 max-w-2xl w-full mx-auto p-6 bg-black rounded-md shadow-md text-white">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <InputWrap className="w-full mb-4">
            <Label className="font-bold text-xl">Modulio pavadinimas:</Label>
            <p className="text-lg mt-2">{moduleData?.pavadinimas}</p>
          </InputWrap>
          <InputWrap className="w-full mb-4">
            <Label className="font-bold text-xl">Atsiliepimas:</Label>
            <p className="text-lg mt-2">{reviewData.atsiliepimas}</p>
          </InputWrap>
          <InputWrap className="w-full mb-4">
            <Label className="font-bold text-xl">Sukūrimo data:</Label>
            <p className="text-lg mt-2">
              {reviewData.data.toLocaleDateString()}
            </p>
          </InputWrap>
          <InputWrap className="w-full mb-4">
            <Label className="font-bold text-xl">Atsiliepimo tipas:</Label>
            <p className="text-lg mt-2">{reviewData.tipas}</p>
          </InputWrap>
          <div className="mt-6">
            <Link
              href={`/moduliai/${reviewData.id}/review`}
              className="underline text-blue-600"
            >
              Atgal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
