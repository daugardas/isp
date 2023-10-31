"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NaudotojoTipas } from "@prisma/client";
import { hash } from "bcryptjs";

export async function signUp(formData: FormData) {
  const session = await auth();
  if (session) {
    return { error: "You are already logged in" };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const firstName = formData.get("firstName") as string;
  const phone = formData.get("phone") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const naudotojas = await prisma.naudotojas.create({
      data: {
        el_pastas: email,
        slaptazodis: await hash(password, 10),
        vardas: firstName,
        telefonas: phone,
        tipas: NaudotojoTipas.paprastas,
        pranesimuNustatymai: {
          create: {
            komentaro_reakcija: false,
            atsakymas_i_komentara: true,
            sisteminis_naudotojo_pranesimas: true,
            siusti_email_atsakymas_i_komentara: true,
            siusti_email_komentaro_reakcija: false,
            siusti_email_sisteminis_pranesimas: true,
          },
        },
      },
    });

    return { message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
