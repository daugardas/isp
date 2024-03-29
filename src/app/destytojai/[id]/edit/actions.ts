"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { DestytojoTipas, DestytojoLaipsnis, DestytojoPareigos, Fakultetas } from "@prisma/client";
import { hash } from "bcryptjs";

export async function editTutor(tutorId: string, formData: FormData) {
  // Authenticating the session
  const session = await auth();

  // Checking if the user is authenticated
  if (!session || !session.user) {
    return { error: "Reikia būti prisijungus" };
  }
  // Extracting form data
  const vardas = formData.get("vardas") as string;
  const pavarde = formData.get("pavarde") as string;
  const el_pastas = formData.get("el_pastas") as string; 
  const telefonas = formData.get("telefonas") as string;
  const gimimo_data = new Date(formData.get("gimimo_data") as string);
  const gyvenamoji_vieta = formData.get("gyvenamoji_vieta") as string;
  const tipas = formData.get("tipas") as DestytojoTipas; 
  const laipsnis = formData.get("laipsnis") as DestytojoLaipsnis;
  var pareigos:DestytojoPareigos[] = [formData.get("pareigos") as DestytojoPareigos];
  const fakultetas_id = parseInt(formData.get("fakultetas_id") as string);

  let exactMatchPhone = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");
  let exactMatchMail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

  var testPhone = exactMatchPhone.test(telefonas);
  var testMail = exactMatchMail.test(el_pastas);

  // Validating required fields
  if (
    isNaN(fakultetas_id) ||
    testPhone != true ||
    testMail != true
  ) {
    return {
      error: "Visi laukai privalomi arba yra klaidu",
    };
  }

  try {
    // Creating a new Tutor
    await prisma.destytojas.update({
      where: { id: parseInt(tutorId) }, // Convert tutorId to number
      data: {
        vardas: vardas,
        pavarde: pavarde,
        el_pastas: el_pastas,
        telefonas: telefonas,
        gimimo_data: gimimo_data,
        gyvenamoji_vieta: gyvenamoji_vieta,
        destytojo_tipas: tipas,
        destytojo_laipsnis: laipsnis,
        destytojo_pareigos: pareigos,
        fakultetasId: fakultetas_id,
      },
    });
  } catch (error) {
    return { error: "Klaida serveryje redaguojant dėstytoją: " + error };
  }

  // Returning success message
  return { message: "Jūsų destytojas sėkmingai redaguotas!" };
}
