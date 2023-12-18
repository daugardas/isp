"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Form from "@/components/Form";
import { editTutor } from "./actions";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { Destytojas, DestytojoTipas, DestytojoLaipsnis, DestytojoPareigos, Fakultetas } from "@prisma/client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { fetchFakultetasOptions } from "./operations";

const initialFormState = {
  message: null,
  error: null,
};

interface EditTutorFormProps {
  params: { id: string };
  destytojas: Destytojas;
}

const destytojas = {
    vardas: "",
    pavarde: "",
    el_pastas: "",
    telefonas: "",
    gimimo_data: null,
    gyvenamoji_vieta: "",
    tipas: "",
    laipsnis: "",
    pareigos: "",
    fakultetas_id: null,
  };

export default function EditTutorForm({
  params,
  destytojas,
}: EditTutorFormProps) {
  const router = useRouter();

  const { id } = params;
  const [selectedTipas, setSelectedTipas] = useState<DestytojoTipas>(
    destytojas.destytojo_tipas
  );
  const [selectedLaipsnis, setSelectedLaipsnis] = useState<DestytojoLaipsnis>(
    destytojas.destytojo_laipsnis
  );
  const [selectedPareigos, setSelectedPareigos] = useState<DestytojoPareigos>(
    destytojas.destytojo_pareigos[0]
  );

  const handleFormAction = async (prevState: any, formData: FormData) => {
    formData.set("tipas", selectedTipas); // Convert enum to string before setting in FormData
    formData.set("laipsnis", selectedLaipsnis);
    formData.set("pareigos", selectedPareigos);
    const response = await editTutor(id, formData); // Pass id to editTutor
    console.log(response);
    router.refresh();

    if (response.message) {
        redirect(`/destytojai/${id}/`);
    } else {
      return {
        ...prevState,
        message: null,
        error: response.error,
      };
    }
  };

  const [state, formAction] = useFormState(handleFormAction, initialFormState);

  const [fakultetasPavadinimas, setFakultetasPavadinimas] = useState<string>("");
  const [fakultetasOptions, setFakultetasOptions] = useState<Fakultetas[]>([]);
  const [fakultetasId, setFakultetasId] = useState<number | null>(null); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await fetchFakultetasOptions();
        setFakultetasOptions(options);
      } catch (error) {
        console.error("Error fetching Fakultetas pavadinimas options:", error);
      }
    };

    fetchData();
  }, []);

  const handleFakultetasPavadinimasChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setFakultetasId(parseInt(event.target.value));
  };

  return (
    <div className="mt-6 w-8/12 max-w-xs flex flex-col items-center gap-4 dark:bg-gray-800 text-white p-4 rounded-md">
      <Form action={formAction}>
        <InputWrap>
          <Label htmlFor="vardas">Vardas:</Label>
          <input
            type="text"
            name="vardas"
            defaultValue={destytojas.vardas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="pavarde">Pavardė:</Label>
          <input
            type="text"
            name="pavarde"
            defaultValue={destytojas.pavarde}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="el_pastas">E-Mail:</Label>
          <input
            type="text"
            name="el_pastas"
            defaultValue={destytojas.el_pastas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="telefonas">Telefonas:</Label>
          <input
            type="text"
            name="telefonas"
            defaultValue={destytojas.telefonas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="gimimo_data">Gimimo data:</Label>
          <input
            type="date"
            name="gimimo_data"
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="gyvenamoji_vieta">Gyvenamoji vieta:</Label>
          <input
            type="text"
            name="gyvenamoji_vieta"
            defaultValue={destytojas.gyvenamoji_vieta}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="tipas">Tipas:</Label>
          <select
            name="tipas"
            value={selectedTipas}
            onChange={(e) => setSelectedTipas(e.target.value as DestytojoTipas)}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          >
            <option value={DestytojoTipas.docentas}>Docentas</option>
            <option value={DestytojoTipas.profesorius}>Professorius</option>
            <option value={DestytojoTipas.lektorius}>Lektorius</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="laipsnis">Laipsnis:</Label>
          <select
            name="laipsnis"
            value={selectedLaipsnis}
            onChange={(e) => setSelectedLaipsnis(e.target.value as DestytojoLaipsnis)}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          >
            <option value={DestytojoLaipsnis.bakalauras}>Bakalauras</option>
            <option value={DestytojoLaipsnis.magistras}>Magistras</option>
            <option value={DestytojoLaipsnis.daktaras}>Daktaras</option>
            <option value={DestytojoLaipsnis.habilituotas_daktaras}>Habilituotas daktaras</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="pareigos">Pareigos:</Label>
          <select
            name="pareigos"
            value={selectedPareigos}
            onChange={(e) => setSelectedPareigos(e.target.value as DestytojoPareigos)}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          >
            <option value={DestytojoPareigos.destytojas}>Dėstytojas</option>
            <option value={DestytojoPareigos.dekanas}>Dekanas</option>
            <option value={DestytojoPareigos.prodekanas}>Prodekanas</option>
            <option value={DestytojoPareigos.studiju_programos_vadovas}>Studijos programų vadovas</option>
            <option value={DestytojoPareigos.studiju_programos_kuratorius}>Studijos programų kuratorius</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="fakultetas_id">Fakultetas:</Label>
          <select
            name="fakultetas_id"
            onChange={(e) => handleFakultetasPavadinimasChange(e)} // Continue using handleFakultetasPavadinimasChange
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
            value={Number(fakultetasId)} // Use the selected value here
          >
            <option value="" disabled>
              Pasirinkite fakultetą
            </option>
            {fakultetasOptions.map((fakultetas) => (
              <option key={fakultetas.id} value={fakultetas.id}>
                {fakultetas.pavadinimas}
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
          <Link href={`/destytojai/${id}`}>Atgal</Link>
          <SubmitButton type="submit">Išsaugoti</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
