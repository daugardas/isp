import prisma from "@/lib/db";
import { Naudotojas, PranesimoTipas } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
  searchFor: string | undefined;
};

export type MinimizedPranesimai = {
    id: number;
    tipas: PranesimoTipas;
    tekstas: string;
    data: Date; 
    naudotojas: Naudotojas; 
  };

export type SearchResponse = {
  pranesimai: MinimizedPranesimai[];
};
export async function POST(req: NextRequest) {
  const { searchFor } = (await req.json()) as DataJson;

  if (!searchFor && searchFor !== "") {
    return NextResponse.json(
      { message: "'searchFor' is not included in your POST request." },
      { status: 400 }
    );
  }

  const pranesimai = await prisma.pranesimas.findMany({
    where: {
        tekstas: {
          contains: searchFor,
        },
      },
      select: {
        id: true,
        tekstas: true,
      },
    });

  return NextResponse.json({ pranesimai }, { status: 200 });
}
