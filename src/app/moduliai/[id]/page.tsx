import InputWrap from "@/components/InputWrap";
import Link from "next/link";
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";
import Kom from '../../komentarai/Kom'; // importing the comment section

  

interface ModuleData {
  id: number;
  pavadinimas: string;
  aprasymas: string;
  kalba: "lietuviu" | "anglu"; // Adjust based on your enum values
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

  const session = await auth();

  
    if (!session || !session.user) {
        redirect("/");
    }
  let loggedIn = false;
  let isAdmin = false;
  let isModuleMaker = true;

  if (session) {
    loggedIn = true;
    const userId = session.user?.id;
    if (userId) {
      const numericUserId = parseInt(userId, 10); // Ensure userId is a number
      const userData = await prisma.naudotojas.findUnique({
        where: {
          id: numericUserId,
        },
      });

      isAdmin = userData?.tipas === $Enums.NaudotojoTipas.administratorius;

      // const reviewData = await prisma.atsiliepimas.findFirst({
      //   where: {
      //     autoriusId: numericUserId,
      //     modulisId: parseInt(id)
      //   },
      // });

      // if(reviewData != null)
      // {
      //   isReviewMaker = true;
      // }
      // else
      // {
      //   isReviewMaker = false;
      // }
    } else {
      return <div>Vartotojas nerastas</div>;
    }
  }

  if (!moduleData) {
    return <div>Modulis nerastas</div>;
  }
  return (
    <div className="mt-6 lg:w-3/4 max-w-3xl w-full mx-auto items-center gap-4">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold">{moduleData.pavadinimas}</h1>
      </div>

      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Modulio aprašymas:</Label>
        <p className="text-sm">{moduleData.aprasymas}</p>
      </InputWrap>

      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Kreditų skaičius:</Label>
        <p className="text-sm">{moduleData.kreditai}</p>
      </InputWrap>

      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Modulio kalba:</Label>
        <p className="text-sm">{moduleData.kalba}</p>
      </InputWrap>

      <div className="flex flex-col space-y-2 mt-4">
        <Link
          href="/moduliai"
          className="text-xl font-semibold hover:text-red-700"
        >
          Atgal
        </Link>

        <Link
          href={`/moduliai/${moduleData.id}/ai`}
          className="text-xl font-semibold hover:text-red-700"
        >
          Chat GPT API modulio aprašymo generavimas
        </Link>

        {isModuleMaker && (
          <Link
            href={`/moduliai/${moduleData.id}/edit`}
            className="text-xl font-semibold hover:text-red-700"
          >
            Koreguoti modulio informaciją
          </Link>
        )}

        {isAdmin && (
          <Link
            href={`/moduliai/${moduleData.id}/remove`}
            className="text-xl font-semibold hover:text-red-700"
          >
            Modulio ištrinimas
          </Link>
        )}

        <Link
          href={`/moduliai/${moduleData.id}/feedback`}
          className="text-xl font-semibold hover:text-red-700"
        >
          Modulio atsiliepimo kūrimas
        </Link>

        <Link
          href={`/moduliai/${moduleData.id}/review`}
          className="text-xl font-semibold hover:text-red-700"
        >
          Atsiliepimai apie modulį
        </Link>
          </div>
          <Kom /> {/* This will display the comments */}
    </div>
  );
}
