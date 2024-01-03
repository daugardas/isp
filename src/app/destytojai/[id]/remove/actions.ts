"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function deleteTutor(tutorId: string) {
  const session = await auth();

  if (!session || !session.user) {
    return { error: "Reikia būti prisijungus" };
  }

  try {
    // Deleting the tutor
    await prisma.destytojas.delete({
      where: { id: parseInt(tutorId) },
    });
  } catch (error) {
    return { error: "Klaida serveryje trinant dėstytoją: " + error };
  }

  // Returning success message
  return { message: "Dėstytojas sėkmingai ištrintas!" };
}
