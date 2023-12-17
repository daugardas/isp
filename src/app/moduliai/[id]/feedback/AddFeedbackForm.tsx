"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { DestomaKalba, IvertinimoTipas } from "@prisma/client";
import SubmitButton from "@/components/SubmitButton";
import { addAtsiliepimas } from "./actions";

const initialFormState = {
  message: null,
  error: null,
};

interface AddFeedbackFormProps {
  moduleId: string;
}

export default function AddFeedbackForm({ moduleId }: AddFeedbackFormProps) {
  const [tipas, setTipas] = useState<IvertinimoTipas>(IvertinimoTipas.modulio);
  const [atsiliepimasText, setAtsiliepimasText] = useState("");

  const handleFormAction = async (prevState: any, formData: FormData) => {
    formData.set("atsiliepimas", atsiliepimasText);

    const response = await addAtsiliepimas(moduleId, formData);

    if (response.message) {
      redirect(`/moduliai/${moduleId}`);
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
          <Label htmlFor="atsiliepimas">Atsiliepimas:</Label>
          <Input
            type="text"
            name="atsiliepimas"
            value={atsiliepimasText}
            onChange={(e) => setAtsiliepimasText(e.target.value)}
            required
          />
        </InputWrap>
        {/* Add more form fields as needed */}

        {state && state.error && (
          <div className="text-red-600">{state.error}</div>
        )}
        {state && state.message && (
          <div className="text-green-600">{state.message}</div>
        )}
        <div className="grid grid-cols-2 gap-5">
          <Link href={`/moduliai/${moduleId}`}>Atgal</Link>
          <SubmitButton type="submit">Pridėti atsiliepimą</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
