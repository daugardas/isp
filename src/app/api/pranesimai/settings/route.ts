import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { PranesimoTipas } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type DataJson = {
  id: number;
  komentaro_reakcija: boolean;
  atsakymas_i_komentara: boolean;
  sisteminis_naudotojo_pranesimas: boolean;
  siusti_email_sisteminis_pranesimas: boolean;
  siusti_email_atsakymas_i_komentara: boolean;
  siusti_email_komentaro_reakcija: boolean;
};

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const {
    komentaro_reakcija,
    atsakymas_i_komentara,
    sisteminis_naudotojo_pranesimas,
    siusti_email_sisteminis_pranesimas,
    siusti_email_atsakymas_i_komentara,
    siusti_email_komentaro_reakcija,
    id,
  } = (await req.json()) as DataJson;

  try {
    const updateSettings = await prisma.pranesimuNustatymai.update({
      where: {
        id: id,
      },
      data: {
        komentaro_reakcija: komentaro_reakcija,
        atsakymas_i_komentara: atsakymas_i_komentara,
        sisteminis_naudotojo_pranesimas: sisteminis_naudotojo_pranesimas,
        siusti_email_sisteminis_pranesimas: siusti_email_sisteminis_pranesimas,
        siusti_email_atsakymas_i_komentara: siusti_email_atsakymas_i_komentara,
        siusti_email_komentaro_reakcija: siusti_email_komentaro_reakcija,
      },
    });

    console.log("Created message:");
    console.log(updateSettings);
    return NextResponse.json(
      {
        message: "pavyko",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "server error",
      },
      { status: 500 }
    );
  }
}
