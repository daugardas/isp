"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { compare, hash } from "bcryptjs";

export async function editProfile(formData: FormData) {
  const session = await auth();
  if (!session || !session.user)
    return { error: "Reikia būti prisijungusĄĄĄĄ" };

  const email = formData.get("email") as string;
  const originalPassword = formData.get("originalPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  if (
    email === "" ||
    originalPassword === "" ||
    newPassword === "" ||
    confirmPassword === "" ||
    name === "" ||
    phone === ""
  ) {
    return {
      error: "Visi laukai privalomi, nebent nenori pasikeisti slaptažodžio:)",
    };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Slaptažodžiai turi sutapti!" };
  }

  const dabartinisNaudotojas = await prisma.naudotojas.findUnique({
    where: {
      id: parseInt(session.user?.id),
    },
  });

  if (!dabartinisNaudotojas) {
    return { error: "Vartotojas nerastas!" };
  }

  if (
    !(await compare(originalPassword as string, dabartinisNaudotojas.slaptazodis))
  ) {
    return { error: "Neteisingas esamas slaptažodis!" };
  }

  try {
    await prisma.naudotojas.update({
      where: {
        id: parseInt(session.user?.id),
      },
      data: {
        slaptazodis: await hash(newPassword, 10),
        vardas: name,
        telefonas: phone,
        el_pastas: email,
      },
    });
  } catch (error) {
    return { error: "Klaida serveryje atnaujinant profilį: " + error };
  }

  return { message: "Jūsų profilis sėkmingai atnaujintas!" };
}
