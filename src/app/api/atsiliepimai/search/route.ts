import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
  searchFor: string | undefined;
};

export type MinimizedAtsiliepimas = {
  id: number;
  atsiliepimas: string;
  modulisId: number;
};

export type SearchResponse = {
  atsiliepimai: MinimizedAtsiliepimas[];
};
export async function POST(req: NextRequest) {
  const { searchFor } = (await req.json()) as DataJson;

  if (!searchFor && searchFor !== "") {
    return NextResponse.json(
      { message: "'searchFor' is not included in your POST request." },
      { status: 400 }
    );
  }

  const atsiliepimai = await prisma.atsiliepimas.findMany({
    where: {
      atsiliepimas: {
        contains: searchFor,
      },
    },
    select: {
      id: true,
      atsiliepimas: true,
      modulisId: true
    },
  });

  return NextResponse.json({ atsiliepimai }, { status: 200 });
}
