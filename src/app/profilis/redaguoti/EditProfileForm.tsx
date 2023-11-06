"use client";

import Form from "@/components/Form";
import { editProfile } from "./actions";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { Naudotojas } from "@prisma/client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

const initialFormState = {
  message: null,
  error: null,
};

export default function EditProfileForm({
  naudotojas,
}: {
  naudotojas: Naudotojas;
}) {
  const handleFormAction = async (prevState: any, formData: FormData) => {
    const response = await editProfile(formData);
    console.log(response);
    if (response.message) {
      return {
        ...prevState,
        message: response.message,
        error: null,
      };
    } else {
      return {
        ...prevState,
        message: null,
        error: response.error,
      };
    }
  };
  const router = useRouter();
  const [state, formAction] = useFormState(handleFormAction, initialFormState);

  return (
    <div className="mt-6 w-8/12 max-w-xs flex flex-col items-center gap-4">
      <Form action={formAction}>
        <InputWrap>
          <Label htmlFor="name">Vardas:</Label>
          <Input
            type="text"
            name="name"
            defaultValue={naudotojas.vardas}
            required
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="email">El. paštas:</Label>
          <Input
            type="email"
            name="email"
            defaultValue={naudotojas.el_pastas}
            required
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="phone">Telefonas:</Label>
          <Input
            type="text"
            name="phone"
            defaultValue={naudotojas.telefonas}
            required
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="originalPassword">Esamas slaptažodis:</Label>
          <Input type="password" name="originalPassword" />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="newPassword">Naujas slaptažodis:</Label>
          <Input type="password" name="newPassword" />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="confirmPassword">Pakartokite naują slaptažodį:</Label>
          <Input type="password" name="confirmPassword" />
        </InputWrap>
        {state && state.error && (
          <InputWrap className="text-red-600">{state.error}</InputWrap>
        )}
        {state && state.message && (
          <InputWrap className="text-green-600">{state.message}</InputWrap>
        )}
        <div className="grid grid-cols-2 gap-5">
          <Button type="button" onClick={() => router.back()}>
            Atšaukti
          </Button>
          <SubmitButton type="submit">Išsaugoti</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
