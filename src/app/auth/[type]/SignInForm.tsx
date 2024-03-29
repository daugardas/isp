"use client";

import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import Form from "@/components/Form";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";

const initialFormState = {
  message: null,
  error: null,
};

export default function SignInForm() {
  const router = useRouter();
  const handleFormAction = async (prevState: any, formData: FormData) => {
    const signInResponse = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!signInResponse || !signInResponse.ok) {
      return {
        ...prevState,
        error:
          signInResponse?.error === "CredentialsSignin" ? "Neteisingas slaptažodis": "Nepavyko prisijungti. Pabandykite vėliau.",
      };
    }

    if (signInResponse.ok) router.refresh();
  };

  const [state, formAction] = useFormState(handleFormAction, initialFormState);

  return (
    <Form action={formAction}>
      <InputWrap>
        <Label htmlFor="email">Įveskite el. paštą:</Label>
        <Input type="email" name="email" required />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="password">Įveskite slaptažodį:</Label>
        <Input type="password" name="password" required />
      </InputWrap>

      <InputWrap>
        <SubmitButton type="submit">Prisijungti</SubmitButton>
      </InputWrap>
      <InputWrap>
        {state.error && <InputWrap className="text-red-600">{state.error}</InputWrap>}
      </InputWrap>
    </Form>
  );
}
