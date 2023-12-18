"use client";
import Form from "@/components/Form";
import React, { useState, useEffect, ChangeEvent } from "react";
import { addTutor } from "./actions";
import prisma from "@/lib/db";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { fetchFakultetasOptions } from "./operations"; // Adjust the path accordingly

const initialFormState = {
  message: null,
  error: null,
};

interface Fakultetas {
  id: number;
  pavadinimas: string;
}

export default function AddTutorForm() {
  const handleFormAction = async (prevState: any, formData: FormData) => {
    const response = await addTutor(formData);
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

  const [fakultetasPavadinimas, setFakultetasPavadinimas] = useState<string>("");
  const [fakultetasOptions, setFakultetasOptions] = useState<Fakultetas[]>([]);
  const [fakultetasId, setFakultetasId] = useState<number | null>(null); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await fetchFakultetasOptions();
        setFakultetasOptions(options);

        // Assuming defaultDestytojas.fakultetasId is initially set
        setFakultetasId(defaultDestytojas.fakultetasId);
      } catch (error) {
        console.error("Error fetching Fakultetas pavadinimas options:", error);
      }
    };

    fetchData();
  }, []);

  const handleFakultetasPavadinimasChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPavadinimas = event.target.value;
    setFakultetasPavadinimas(selectedPavadinimas);
    const selectedFakultetas = fakultetasOptions.find(
      (fakultetas) => fakultetas.pavadinimas === selectedPavadinimas
    );
    setFakultetasId(selectedFakultetas ? selectedFakultetas.id : null);
  };

  const defaultDestytojas = {
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

  return (
    <div className="mt-6 w-8/12 max-w-xs flex flex-col items-center gap-4 dark:bg-gray-800 text-white p-4 rounded-md">
      <Form action={formAction}>
        <InputWrap>
          <Label htmlFor="vardas">Vardas:</Label>
          <input
            type="text"
            name="vardas"
            defaultValue={defaultDestytojas.vardas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="pavarde">Pavardė:</Label>
          <input
            type="text"
            name="pavarde"
            defaultValue={defaultDestytojas.pavarde}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="el_pastas">E-Mail:</Label>
          <input
            type="text"
            name="el_pastas"
            defaultValue={defaultDestytojas.el_pastas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="telefonas">Telefonas:</Label>
          <input
            type="text"
            name="telefonas"
            defaultValue={defaultDestytojas.telefonas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="gimimo_data">Gimimo data:</Label>
          <input
            type="text"
            name="gimimo_data"
            defaultValue={defaultDestytojas.gimimo_data}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="gyvenamoji_vieta">Gyvenamoji vieta:</Label>
          <input
            type="text"
            name="gyvenamoji_vieta"
            defaultValue={defaultDestytojas.gyvenamoji_vieta}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="tipas">Tipas:</Label>
          <select
            name="tipas"
            defaultValue={defaultDestytojas.tipas}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          >
            <option value="docentas">Docentas</option>
            <option value="profesorius">Profesorius</option>
            <option value="lektorius">Lektorius</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="laipsnis">Laipsnis:</Label>
          <select
            name="laipsnis"
            defaultValue={defaultDestytojas.laipsnis}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          >
            <option value="bakalauras">Bakalauras</option>
            <option value="magistras">Magistras</option>
            <option value="daktaras">Daktaras</option>
            <option value="habilituotas_daktaras">Habilituotas daktaras</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="pareigos">Pareigos:</Label>
          <select
            name="pareigos"
            defaultValue={defaultDestytojas.pareigos}
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
          >
            <option value="destytojas">Dėstytojas</option>
            <option value="dekanas">Dekanas</option>
            <option value="prodekanas">Prodekanas</option>
            <option value="studiju_programu_vadovas">Studijos programų vadovas</option>
            <option value="studijos_programu_kuratorius">Studijos programų kuratorius</option>
          </select>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="fakultetas_id">Fakultetas:</Label>
          <select
            name="fakultetas_id"
            onChange={(e) => handleFakultetasPavadinimasChange(e)} // Continue using handleFakultetasPavadinimasChange
            required
            className="dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md"
            value={fakultetasPavadinimas} // Use the selected value here
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
        {/* Add other fields based on your Modulis model */}
        {state && state.error && (
          <div className="text-red-600">{state.error}</div>
        )}
        {state && state.message && (
          <div className="text-green-600">{state.message}</div>
        )}
        <div className="grid grid-cols-2 gap-5">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
          >
            Atšaukti
          </Button>
          <SubmitButton
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md"
          >
            Išsaugoti
          </SubmitButton>
        </div>
      </Form>
    </div>
  );
}
