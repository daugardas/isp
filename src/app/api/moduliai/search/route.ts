import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
  searchFor: string | undefined;
};

export type MinimizedModulis = {
  id: number;
  pavadinimas: string;
};

export type SearchResponse = {
  moduliai: MinimizedModulis[];
};
export async function POST(req: NextRequest) {
  const { searchFor } = (await req.json()) as DataJson;

  if (!searchFor && searchFor !== "") {
    return NextResponse.json(
      { message: "'searchFor' is not included in your POST request." },
      { status: 400 }
    );
  }

  const moduliai = await prisma.modulis.findMany({
    where: {
      pavadinimas: {
        contains: searchFor,
      },
    },
    select: {
      id: true,
      pavadinimas: true,
    },
  });

  return NextResponse.json({ moduliai }, { status: 200 });
}
