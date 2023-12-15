"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { DestomaKalba } from "@prisma/client";
import { hash } from "bcryptjs";

// Function to add a module
export async function addModule(formData: FormData) {
    // Authenticating the session
    const session = await auth();
    
    // Checking if the user is authenticated
    if (!session || !session.user) {
        return { error: "Reikia būti prisijungus" };
    }

    // Extracting form data
    const pavadinimas = formData.get("pavadinimas") as string;
    const aprasymas = formData.get("aprasymas") as string;
    const kalba = formData.get("kalba") as DestomaKalba; // Assuming kalba is an enum
    const kreditai = parseInt(formData.get("kreditai") as string);
    const kryptisId = parseInt(formData.get("kryptisId") as string);
    const destytojasId = parseInt(formData.get("destytojasId") as string);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    // Validating required fields
    if (pavadinimas === "" || aprasymas === "" || isNaN(kreditai) || isNaN(kryptisId)) {
        return {
            error: "Visi laukai privalomi, nebent nenori pridėti)",
        };
    }

    try {
        // Creating a new module
        await prisma.modulis.create({
            data: {
                pavadinimas: pavadinimas,
                aprasymas: aprasymas,
                kalba: kalba,
                kreditai: kreditai,
                kryptisId: kryptisId,
                destytojasId: destytojasId
            },
        });
    } catch (error) {
        return { error: "Klaida serveryje pridedant modulį: " + error };
    }

    // Returning success message
    return { message: "Jūsų modulis sėkmingai pridėtas!" };
}
