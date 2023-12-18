import InputWrap from "@/components/InputWrap";
import Link from "next/link";
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { $Enums } from "@prisma/client";

interface TutorData {
  id: number;
  vardas: string;
  pavarde: string;
  el_pastas: string;
  telefonas: string;
  gimimo_data: string;
  gyvenamoji_vieta: string;
  destytojo_tipas: "docentas" | "profesorius" | "lektorius";
  destytojo_laipsnis: "bakalauras" | "magistras" | "daktaras" | "habilituotas_daktaras";
  destytojo_pareigos: "destytojas" | "dekanas" | "prodekanas" | "studiju_programos_vadovas" | "studiju_programos_kuratorius" ;
  fakultetasId: number | null;
  perziuros: number;
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

  const tutorData = await prisma.destytojas.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const session = await auth();
  let loggedIn = false;
  let isAdmin = false;
  let isTutorMaker = true;

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

  if (!tutorData) {
    return <div>Dėstytojas nerastas</div>;
  }



   await prisma.destytojas.update({
    where: {
      id: parseInt(id),
    }, data: {
        perziuros: tutorData.perziuros+1,
      },
  });

  return (
    <div className="mt-6 lg:w-3/4 max-w-3xl w-full mx-auto items-center gap-4">
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold">{tutorData.vardas} {tutorData.pavarde}</h1>
      </div>

      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Dėstytojo el. paštas:</Label>
        <p className="text-sm">{tutorData.el_pastas}</p>
      </InputWrap>

      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Mob. telefonas:</Label>
        <p className="text-sm">{tutorData.telefonas}</p>
      </InputWrap>

      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Gimimo data:</Label>
        <p className="text-sm">{tutorData.gimimo_data.toLocaleString()}</p>
      </InputWrap>
      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Gyvenamoji vieta:</Label>
        <p className="text-sm">{tutorData.gyvenamoji_vieta}</p>
      </InputWrap>
      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Tipas:</Label>
        <p className="text-sm">{tutorData.destytojo_tipas.toUpperCase()}</p>
      </InputWrap>
      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Laipsnis:</Label>
        <p className="text-sm">{tutorData.destytojo_laipsnis.toUpperCase()}</p>
      </InputWrap>
      <InputWrap className="w-full">
        <Label className="font-bold text-blue-600">Pareigos:</Label>
        <p className="text-sm">{tutorData.destytojo_pareigos}</p>
      </InputWrap>


      <div className="flex flex-col space-y-2 mt-4">
        <Link
          href="/destytojai"
          className="text-xl font-semibold hover:text-red-700"
        >
          Atgal
        </Link>

        {isTutorMaker && (
          <Link
            href={`/destytojai/${tutorData.id}/edit`}
            className="text-xl font-semibold hover:text-red-700"
          >
            Koreguoti dėstytojo informaciją
          </Link>
        )}

        {isAdmin && (
          <Link
            href={`/destytojai/${tutorData.id}/remove`}
            className="text-xl font-semibold hover:text-red-700"
          >
            Dėstytojo ištrinimas
          </Link>
        )}

        <Link
          href={`/destytojai/${tutorData.id}/feedback`}
          className="text-xl font-semibold hover:text-red-700"
        >
          Dėstytojo atsiliepimas
        </Link>

        <Link
          href={`/destytojai/${tutorData.id}/review`}
          className="text-xl font-semibold hover:text-red-700"
        >
          Atsiliepimai apie dėstytojus
        </Link>
      </div>
    </div>
  );
}
