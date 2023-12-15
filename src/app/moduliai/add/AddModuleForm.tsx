"use client";
import Form from "@/components/Form";
import { addModule } from "./actions";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

const initialFormState = {
  message: null,
  error: null,
};

export default function AddModuleForm() {
  const handleFormAction = async (prevState: any, formData: FormData) => {
    const response = await addModule(formData);
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

  // Default values for modulis object
  const defaultModulis = {
    pavadinimas: "",
    aprasymas: "",
    kalba: "",
    kreditai: 0,
    kryptisId: 0,
    destytojasId: null,
  };

  return (
    <div className="mt-6 w-8/12 max-w-xs flex flex-col items-center gap-4">
      <Form action={formAction}>
        <InputWrap>
          <Label htmlFor="pavadinimas">Pavadinimas:</Label>
          <Input type="text" name="pavadinimas" defaultValue={defaultModulis.pavadinimas} required />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="aprasymas">Aprašymas:</Label>
          <Input type="text" name="aprasymas" defaultValue={defaultModulis.aprasymas} required />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kalba">Kalba:</Label>
          <Input type="text" name="kalba" defaultValue={defaultModulis.kalba} required />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kreditai">Kreditai:</Label>
          <Input type="number" name="kreditai" defaultValue={defaultModulis.kreditai} required />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kryptisId">Kryptis ID:</Label>
          <Input type="number" name="kryptisId" defaultValue={defaultModulis.kryptisId} required />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="destytojasId">Destytojas ID:</Label>
          <Input type="number" name="destytojasId" defaultValue={defaultModulis.destytojasId ?? ""} />
        </InputWrap>
        {/* Add other fields based on your Modulis model */}
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