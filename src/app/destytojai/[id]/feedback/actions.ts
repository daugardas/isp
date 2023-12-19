"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { IvertinimoTipas } from "@prisma/client"; // Assuming IvertinimoTipas is an enum

export async function addAtsiliepimas(tutorId: string, formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    return { error: "Reikia būti prisijungus" };
  }

  const atsiliepimas = formData.get("atsiliepimas") as string;
  const data = new Date();
  const autoriusId = session.user.id;
  console.log(atsiliepimas);
  console.log(data);
  console.log(autoriusId);

  // Validating required fields
  if (atsiliepimas === "" || isNaN(parseInt(tutorId))) {
    return {
      error: "Visi laukai privalomi",
    };
  }

  try {
    await prisma.atsiliepimas.create({
      data: {
        tipas: IvertinimoTipas.destytojo,
        atsiliepimas: atsiliepimas,
        data: data,
        autoriusId: parseInt(autoriusId),
        destytojasId: parseInt(tutorId),
      },
    });
  } catch (error) {
    return { error: "Klaida serveryje pridedant atsiliepimą: " + error };
  }

  return { message: "Jūsų atsiliepimas sėkmingai pridėtas!" };
}
