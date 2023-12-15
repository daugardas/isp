"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { IvertinimoTipas } from "@prisma/client"; // Assuming IvertinimoTipas is an enum


export async function addAtsiliepimas(moduleId: string, formData: FormData) {

    const session = await auth();


    if (!session || !session.user) {
        return { error: "Reikia būti prisijungus" };
    }


    const tipas = formData.get("tipas") as IvertinimoTipas;
    const atsiliepimas = formData.get("atsiliepimas") as string;
    const data = new Date(); 
    const autoriusId = session.user.id;

    // Validating required fields
    if (!tipas || atsiliepimas === "" || isNaN(parseInt(moduleId))) {
        return {
            error: "Visi laukai privalomi, nebent nenori pridėti)",
        };
    }

    try {
        await prisma.atsiliepimas.create({
            data: {
                tipas: tipas,
                atsiliepimas: atsiliepimas,
                data: data,
                autoriusId: parseInt(autoriusId),
                modulisId: parseInt(moduleId)
            },
        });
    } catch (error) {
        return { error: "Klaida serveryje pridedant atsiliepimą: " + error };
    }

    return { message: "Jūsų atsiliepimas sėkmingai pridėtas!" };
}