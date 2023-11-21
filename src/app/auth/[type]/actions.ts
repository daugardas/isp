"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import { createHash } from "crypto";
import { renderConfirmCodeEmail, sendConfirmCodeEmail } from "@/lib/mailing";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signUp(formData: FormData) {
  const session = await auth();
  if (session) {
    return { error: "You are already logged in" };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const firstName = formData.get("firstName") as string;
  const phone = formData.get("phone") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const naudotojas = await prisma.naudotojas.create({
      data: {
        el_pastas: email,
        slaptazodis: await hash(password, 10),
        vardas: firstName,
        telefonas: phone,
        pranesimuNustatymai: {
          create: {
            komentaro_reakcija: false,
            atsakymas_i_komentara: true,
            sisteminis_naudotojo_pranesimas: true,
            siusti_email_atsakymas_i_komentara: true,
            siusti_email_komentaro_reakcija: false,
            siusti_email_sisteminis_pranesimas: true,
          },
        },
      },
    });

    // send request email confirmation email
    try {
      const code = createHash("sha256")
        .update(email)
        .digest("hex")
        .slice(0, 4)
        .toUpperCase();

      // const data = await resend.emails.send({
      //   from: "Test <onboarding@resend.dev>",
      //   to: [email],
      //   subject: "Confirm your email",
      //   react: EmailRequestConfirmTemplate({
      //     firstName,
      //     confirmCode: code,
      //   }),
      // });
      const html = await renderConfirmCodeEmail(firstName, code);
      const data = await sendConfirmCodeEmail(
        email,
        "Confirm your email",
        "text",
        html
      );

      // write email confirmation code to db
      await prisma.patvirtinimoKodas.create({
        data: {
          kodas: code,
          data: new Date(),
          naudotojasId: naudotojas.id,
        },
      });

      console.log("Email sent", data);
    } catch (error) {
      console.error("Error sending email", error);
      return { error };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }

  //redirect();
  cookies().set("confirmEmail", email);
  redirect("/auth/confirm");
}
