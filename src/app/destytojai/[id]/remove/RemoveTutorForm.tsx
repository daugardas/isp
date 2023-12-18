"use client";
import React, { useState } from "react";
import Form from "@/components/Form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { deleteTutor } from "./actions";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import SubmitButton from "@/components/SubmitButton";

interface RemoveTutorFormProps {
  tutorId: string;
}

const initialFormState = {
  message: null as string | null,
  error: null as string | null,
};

const RemoveTutorForm: React.FC<RemoveTutorFormProps> = ({ tutorId }) => {
  const [state, setState] = useState(initialFormState);

  const handleFormAction = async () => {
    try {
      const response = await deleteTutor(tutorId);

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
      console.error("Error deleting tutor:", error);
      setState({
        message: null,
        error: "An error occurred while deleting the tutor",
      });
    }
  };

  return (
    <div className=" mt-6 w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <Form action={handleFormAction}>
        {/* Hidden input to send tutor ID to the server */}
        <input type="hidden" name="tutorId" value={tutorId} />

        <div className="grid grid-cols-2 gap-4">
          <Link
            href={`/destytojai`}
            className="text-blue-800 hover:underline"
          >
            Atgal
          </Link>

          <SubmitButton
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Ištrinti
          </SubmitButton>
        </div>

        {state.message && (
          <div className="text-green-600 mt-4">{state.message}</div>
        )}
        {state.error && <div className="text-red-600 mt-4">{state.error}</div>}
      </Form>
    </div>
  );
};

export default RemoveTutorForm;
