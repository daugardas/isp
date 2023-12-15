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
    <div className="mt-6 w-8/12 max-w-xs flex flex-col items-center gap-4 dark:bg-gray-800 text-white p-4 rounded-md">
      <Form action={formAction}>
        <InputWrap>
          <Label htmlFor="pavadinimas">Pavadinimas:</Label>
          <input type="text" name="pavadinimas" defaultValue={defaultModulis.pavadinimas} required className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md" />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="aprasymas">Aprašymas:</Label>
          <input type="text" name="aprasymas" defaultValue={defaultModulis.aprasymas} required className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md" />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kalba">Kalba:</Label>
          <select name="kalba" defaultValue={defaultModulis.kalba} required className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md">
            <option value="lietuviu">Lietuvių</option>
            <option value="anglu">Anglų</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kreditai">Kreditai:</Label>
          <input type="number" name="kreditai" defaultValue={defaultModulis.kreditai} required className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md" />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kryptisId">Kryptis ID:</Label>
          <input type="number" name="kryptisId" defaultValue={defaultModulis.kryptisId} required className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md" />
        </InputWrap>
        {/* Add other fields based on your Modulis model */}
        {state && state.error && (
          <div className="text-red-600">{state.error}</div>
        )}
        {state && state.message && (
          <div className="text-green-600">{state.message}</div>
        )}
        <div className="grid grid-cols-2 gap-5">
        <Button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md">
            Atšaukti
          </Button>
          <SubmitButton type="submit" className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md">
            Išsaugoti
          </SubmitButton>
        </div>
      </Form>
    </div>
  );
}