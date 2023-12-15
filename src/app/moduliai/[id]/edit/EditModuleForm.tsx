"use client";

import React, { useEffect, useState } from 'react';
import { redirect } from "next/navigation";
import Link from 'next/link';
import Form from "@/components/Form";
import { editModule } from "./actions";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { Modulis , DestomaKalba} from "@prisma/client";
import Button from "@/components/Button";
import { useRouter } from "next/router"; // Changed from next/navigation
import SubmitButton from "@/components/SubmitButton";

const initialFormState = {
  message: null,
  error: null,
};

interface EditModuleFormProps {
  params: { id: string };
  modulis: Modulis;
}

export default function EditModuleForm({ params, modulis }: EditModuleFormProps) {
  const { id } = params;
  const [selectedKalba, setSelectedKalba] = useState<DestomaKalba>(modulis.kalba);

  const handleFormAction = async (prevState: any, formData: FormData) => {
    formData.set("kalba", selectedKalba.toString()); // Convert enum to string before setting in FormData
    const response = await editModule(id, formData); // Pass id to editModule
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

  const [state, formAction] = useFormState(handleFormAction, initialFormState);

  useEffect(() => {
    // If you need any side effects on component mount, you can put them here
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="mt-6 w-8/12 max-w-xs flex flex-col items-center gap-4 dark:bg-gray-800 text-black p-4 rounded-md">
      <Form action={formAction}>
        <InputWrap>
          <Label htmlFor="pavadinimas">Pavadinimas:</Label>
          <Input
            type="text"
            name="pavadinimas"
            defaultValue={modulis.pavadinimas}
            required
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="aprasymas">Aprašymas:</Label>
          <Input
            type="text"
            name="aprasymas"
            defaultValue={modulis.aprasymas}
            required
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kalba">Kalba:</Label>
          <select
            name="kalba"
            value={selectedKalba}
            onChange={(e) => setSelectedKalba(e.target.value as DestomaKalba)}
            required
          >
            <option value={DestomaKalba.lietuviu}>Lietuvių</option>
            <option value={DestomaKalba.anglu}>Anglų</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kreditai">Kreditai:</Label>
          <Input
            type="number"
            name="kreditai"
            defaultValue={modulis.kreditai}
            required
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="kryptisId">Krypties ID:</Label>
          <Input
            type="number"
            name="kryptisId"
            defaultValue={modulis.kryptisId}
            required
          />
        </InputWrap>
        {state && state.error && (
          <div className="text-red-600">{state.error}</div>
        )}
        {state && state.message && (
          <div className="text-green-600">{state.message}</div>
        )}
        <div className="grid grid-cols-2 gap-5">
        <Link href={`/moduliai/${id}`}>
              Atgal
        </Link>
          <SubmitButton type="submit">Išsaugoti</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
