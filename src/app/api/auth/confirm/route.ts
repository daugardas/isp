import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = (await req.json()) as { code: string };

  if (!code) {
    return NextResponse.json(
      { message: "'code' is not included in your POST request." },
      { status: 400 }
    );
  }

  if (code.length != 4) {
    return NextResponse.json(
      { message: "'code' is not 4 characters long." },
      { status: 400 }
    );
  }

  try {
    const emailCookie = req.cookies.get("confirmEmail")?.value;
    if (!emailCookie) {
      return NextResponse.json(
        { message: "No email cookie found." },
        { status: 400 }
      );
    }

    const codeExists = await prisma.patvirtinimoKodas.findUnique({
      where: {
        kodas: code,
        naudotojas: {
          el_pastas: emailCookie,
        },
      },
    });

    if (!codeExists) {
      return NextResponse.json(
        { message: "Įvestas kodas neteisingas!" },
        { status: 400 }
      );
    }

    await prisma.naudotojas.update({
      where: {
        el_pastas: emailCookie,
      },
      data: {
        el_pastas_patvirtintas: true,
      },
    });

    await prisma.patvirtinimoKodas.delete({
      where: {
        kodas: code,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }

  cookies().set("confirmEmail", "", { maxAge: 0 });

  return NextResponse.json(
    { message: "Patvirtinimo kodas teisingas. Prisijunkite!" },
    { status: 200 }
  );
}
