"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Form from "@/components/Form";
import { editModule } from "./actions";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { Modulis, DestomaKalba } from "@prisma/client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { fetchKryptisOptions } from "./operations";

const initialFormState = {
  message: null,
  error: null,
};

interface EditModuleFormProps {
  params: { id: string };
  modulis: Modulis;
}

interface Kryptis {
  id: number;
  pavadinimas: string;
}

const defaultModulis = {
  pavadinimas: "",
  aprasymas: "",
  kalba: "",
  kreditai: 0,
  kryptisId: 0,
  destytojasId: null,
};

export default function EditModuleForm({
  params,
  modulis,
}: EditModuleFormProps) {
  const router = useRouter();

  const { id } = params;
  const [selectedKalba, setSelectedKalba] = useState<DestomaKalba>(
    modulis.kalba
  );

  const handleFormAction = async (prevState: any, formData: FormData) => {
    formData.set("kalba", selectedKalba); // Convert enum to string before setting in FormData
    const response = await editModule(id, formData); // Pass id to editModule
    console.log(response);
    router.refresh();

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

  const [kryptisPavadinimas, setKryptisPavadinimas] = useState<string>("");
  const [kryptisOptions, setKryptisOptions] = useState<Kryptis[]>([]);
  const [kryptisId, setKryptisId] = useState<number>(modulis.kryptisId); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await fetchKryptisOptions();
        setKryptisOptions(options);
      } catch (error) {
        console.error("Error fetching Kryptis pavadinimas options:", error);
      }
    };

    fetchData();
  }, []);

  const handleKryptisPavadinimasChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setKryptisId(parseInt(event.target.value));
  };

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
          <Label htmlFor="kryptisId">Kryptis:</Label>
          <select
            name="kryptisId"
            onChange={(e) => handleKryptisPavadinimasChange(e)} // Continue using handleKryptisPavadinimasChange
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
            value={kryptisId} // Use the selected value here
          >
            <option value="" disabled>
              Pasirinkite Kryptį
            </option>
            {kryptisOptions.map((kryptis) => (
              <option key={kryptis.id} value={kryptis.id}>
                {kryptis.pavadinimas}
              </option>
            ))}
          </select>
        </InputWrap>
        {state && state.error && (
          <div className="text-red-600">{state.error}</div>
        )}
        {state && state.message && (
          <div className="text-green-600">{state.message}</div>
        )}
        <div className="grid grid-cols-2 gap-5">
          <Link href={`/moduliai/${id}`}>Atgal</Link>
          <SubmitButton type="submit">Išsaugoti</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
