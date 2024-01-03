import React, { useState } from "react";
import Form from "@/components/Form";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import SubmitButton from "@/components/SubmitButton";
import InputWrap from "@/components/InputWrap";
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
}

const initialFormState = {
  message: null as string | null,
  error: null as string | null,
};

export default async function Page(params: {tutorId: number}){
  const { tutorId } = params;

  const tutorData = await prisma.destytojas.findUnique({
    where: {
      id: parseInt(tutorId),
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
      </div>
    </div>
  );
};
