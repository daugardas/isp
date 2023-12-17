"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { DestomaKalba, IvertinimoTipas } from "@prisma/client";

interface ModuleProps {
  moduliai: {
    id: number;
    pavadinimas: string;
    aprasymas: string;
    kalba: DestomaKalba;
    kreditai: number;
    kryptisId: number;
    destytojasId: number | null;
  }[];
}

async function generateModuleTitle(name: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      prompt: name,
      model: "text-gpt-3.5-turbo",
    }),
  });
  const data = await response.json();
  console.log("ChatGPT API Response:", data);
  const generatedTitle = data.choices[0]?.text;
  return generatedTitle || `Generated Title for ${name}`;
}

export default function ChatGptForm({ moduliai }: ModuleProps) {
  const [generatedTitle, setGeneratedTitle] = useState<string | null>(null);

  useEffect(() => {
    // Ensure there's at least one module before calling ChatGpt
    if (moduliai.length > 0) {
      const moduleName = moduliai[0].pavadinimas;

      generateModuleTitle(moduleName).then((title) => {
        setGeneratedTitle(title);
      });
    }
  }, [moduliai]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1>Modulio pavadinimas: {moduliai[0].pavadinimas}</h1>
      {generatedTitle && <p>Sugeneruotas aprašymas: {generatedTitle}</p>}
    </div>
  );
}
