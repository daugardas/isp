"use client";

import { useFormState } from "react-dom";
import { signUp } from "./actions";
import Form from "@/components/Form";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialFormState = {
  message: null,
  error: null,
};

export default function SignUpForm() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/auth/confirm");
  }, [router]);

  const handleFormAction = async (prevState: any, formData: FormData) => {
    const response = await signUp(formData);
    if (response.error) {
      return {
        ...prevState,
        error: response.error,
      };
    }
  };

  const [state, formAction] = useFormState(handleFormAction, initialFormState);

  return (
    <Form action={formAction}>
      <InputWrap>
        <Label htmlFor="firstName">Įveskite vardą:</Label>
        <Input type="text" name="firstName" required />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="email">Įveskite el. paštą:</Label>
        <Input type="email" name="email" required />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="phone">Įveskite tel. nr.:</Label>
        <Input type="tel" name="phone" required />
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
        <SubmitButton type="submit">Registruotis</SubmitButton>
      </InputWrap>
      <InputWrap>
        {state.error && <InputWrap>{state.error}</InputWrap>}
      </InputWrap>
    </Form>
  );
}
