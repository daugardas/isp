"use client";
import React, { useState } from 'react';
import Form from "@/components/Form";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { deleteModule } from "./actions";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import SubmitButton from "@/components/SubmitButton";

interface RemoveModuleFormProps {
  moduleId: string;
}

const initialFormState = {
  message: null as string | null,
  error: null as string | null,
};

const RemoveModuleForm: React.FC<RemoveModuleFormProps> = ({ moduleId }) => {
  const [state, setState] = useState(initialFormState);

  const handleFormAction = async () => {
    try {
      const response = await deleteModule(moduleId);

      if (response.message) {
        setState({
          message: response.message,
          error: null,
        });
      } else {
        setState({
          message: null,
          error: response.error || "Unknown error occurred",
        });
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      setState({
        message: null,
        error: "An error occurred while deleting the module",
      });
    }
  };

  return (
    <div className="mt-6 w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <Form action={handleFormAction}>
        {/* Hidden input to send module ID to the server */}
        <input type="hidden" name="moduleId" value={moduleId} />
  
        <div className="grid grid-cols-2 gap-4">
          <Link href={`/moduliai/${moduleId}`} className="text-blue-800 hover:underline">
            Atgal
          </Link>
  
          <SubmitButton type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
            Ištrinti
          </SubmitButton>
        </div>
  
        {state.message && <div className="text-green-600 mt-4">{state.message}</div>}
        {state.error && <div className="text-red-600 mt-4">{state.error}</div>}
      </Form>
    </div>
  );
};

export default RemoveModuleForm;