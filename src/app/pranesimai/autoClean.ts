"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DELETE_DAY = 90;

export const deleteOldPranesimas = async () => {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - DELETE_DAY);
    const deletedRecords = await prisma.pranesimas.deleteMany({
      where: {
        data: {
          lt: ninetyDaysAgo,
        },
      },
    });

    console.log(`${deletedRecords.count} records deleted.`);
  } catch (error) {
    console.error("Error deleting old Pranesimas records:", error);
  } finally {
    await prisma.$disconnect();
  }
};