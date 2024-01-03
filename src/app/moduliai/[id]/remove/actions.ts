"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function deleteModule(moduleId: string) {
  const session = await auth();

  if (!session || !session.user) {
    return { error: "Reikia būti prisijungus" };
  }

  try {
    // Deleting the module
    await prisma.modulis.delete({
      where: { id: parseInt(moduleId) },
    });
  } catch (error) {
    return { error: "Klaida serveryje trinant modulį: " + error };
  }

  // Returning success message
  return { message: "Modulis sėkmingai ištrintas!" };
}
