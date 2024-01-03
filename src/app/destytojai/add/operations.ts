"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchFakultetasOptions = async () => {
  try {
    const fakultetasOptions = await prisma.fakultetas.findMany({
      select: {
        pavadinimas: true,
        id: true,
      },
    });

    return fakultetasOptions;
  } catch (error) {
    console.error("Error fetching Fakultetas pavadinimas options:", error);
    return [];
  }
};
