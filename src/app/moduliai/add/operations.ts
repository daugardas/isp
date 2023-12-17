"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchKryptisOptions = async () => {
  try {
    const kryptisOptions = await prisma.kryptis.findMany({
      select: {
        pavadinimas: true,
        id: true,
      },
    });

    return kryptisOptions;
  } catch (error) {
    console.error('Error fetching Kryptis pavadinimas options:', error);
    return [];
  }
};