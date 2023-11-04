import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
  searchFor: string | undefined;
};

export type MinimizedNaudotojas = {
  id: number;
  vardas: string;
};

export type SearchResponse = {
  naudotojai: MinimizedNaudotojas[];
};
export async function POST(req: NextRequest) {
  const { searchFor } = (await req.json()) as DataJson;

  if (!searchFor && searchFor !== "") {
    return NextResponse.json(
      { message: "'searchFor' is not included in your POST request." },
      { status: 400 }
    );
  }

  const naudotojai = await prisma.naudotojas.findMany({
    where: {
      vardas: {
        contains: searchFor,
      },
    },
    select: {
      id: true,
      vardas: true,
    },
  });

  return NextResponse.json({ naudotojai }, { status: 200 });
}
