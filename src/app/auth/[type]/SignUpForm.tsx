"use client";

import { useFormState } from "react-dom";
import { signUp } from "./actions";
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

export default function SignUpForm() {
  const router = useRouter();
  const handleFormAction = async (prevState: any, formData: FormData) => {
    const response = await signUp(formData);
    if (response.error) {
      return {
        ...prevState,
        error: response.error,
      };
    }

    // automatically sign in after successful sign up
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
          "Pavyko sukurti vartotoją, bet nepavyko prisijungti. Bandykite prisijungti rankiniu būdu.",
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
        <Label htmlFor="confirmPassword">Patvirtinkinte slaptažodį:</Label>
        <Input type="password" name="confirmPassword" required />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="firstName">Įveskite vardą:</Label>
        <Input type="text" name="firstName" required />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="phone">Įveskite tel. nr.:</Label>
        <Input type="tel" name="phone" required />
      </InputWrap>
      <InputWrap>
        <SubmitButton type="submit">Registruotis</SubmitButton>
      </InputWrap>
      <InputWrap>
        {state.error && <InputWrap>{state.error}</InputWrap>}
      </InputWrap>
    </Form>
  );
}
