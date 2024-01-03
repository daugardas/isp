import InputWrap from "@/components/InputWrap";
import Link from "next/link";
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { $Enums } from "@prisma/client";

import Link from 'next/link';

export default async function Home() {
  const id = 1;
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
      <div>
              <Kom /> {/* This will display the comments */}
      </div>
    </div>
  );
}
