"use client";
import { PranesimuNustatymai } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsForm({
  originalSettings,
}: {
  originalSettings: PranesimuNustatymai;
}) {
  const router = useRouter();
  const [settings, setSettings] =
    useState<PranesimuNustatymai>(originalSettings);

  const handleApply = async () => {
    console.log("Settings applied");

    const res = await fetch("/api/pranesimai/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (!res.ok) {
      console.log("nepavyko");
    } else {
      const body = await res.json();
      console.log(body);
      router.refresh();
    }
  };

  console.log(settings);

  return (
    <>
      <div>
        <label>Ar norite gauti pranešimus apie komentarų reakcijas?</label>
        <select
          value={Number(settings.komentaro_reakcija)}
          onChange={(e) =>
            {
              setSettings({
                ...settings,
                komentaro_reakcija: Number(e.target.value) === 1 ?true:false,
              })
            }
          }
        >
          <option value={1}>Taip</option>
          <option value={0}>Ne</option>
        </select>
      </div>

      <div>
        <label>
          Ar norite gauti pranešimus apie komentarų reakcijas į gmail?
        </label>
        <select
          value={Number(settings.siusti_email_komentaro_reakcija)}
          onChange={(e) =>
            {
              console.log(e.target.value);
              setSettings({
                ...settings,
                siusti_email_komentaro_reakcija: Number(e.target.value) === 1 ?true:false,
              })
            }
          }
        >
          <option value={1}>Taip</option>
          <option value={0}>Ne</option>
        </select>
      </div>

      <div>
        <label>Ar norite gauti pranešimus apie komentarų atsakymus?</label>
        <select
          value={Number(settings.atsakymas_i_komentara)}
          onChange={(e) =>
            setSettings({
              ...settings,
              atsakymas_i_komentara: Number(e.target.value) === 1 ?true:false,
            })
          }
        >
          <option value={1}>Taip</option>
          <option value={0}>Ne</option>
        </select>
      </div>

      <div>
        <label>
          Ar norite gauti pranešimus apie komentarų atsakymus į gmail?
        </label>
        <select
          value={Number(settings.siusti_email_atsakymas_i_komentara)}
          onChange={(e) =>
            setSettings({
              ...settings,
              siusti_email_atsakymas_i_komentara: Number(e.target.value) === 1 ?true:false,
            })
          }
        >
          <option value={1}>Taip</option>
          <option value={0}>Ne</option>
        </select>
      </div>

      <div>
        <label>Ar norite gauti sisteminius pranešimus?</label>
        <select
          value={Number(settings.sisteminis_naudotojo_pranesimas)}
          onChange={(e) =>
            setSettings({
              ...settings,
              sisteminis_naudotojo_pranesimas: Number(e.target.value) === 1 ?true:false,
            })
          }
        >
          <option value={1}>Taip</option>
          <option value={0}>Ne</option>
        </select>
      </div>
      <div>
        <label>Ar norite gauti sisteminius pranešimus į gmail?</label>
        <select
          value={Number(settings.siusti_email_sisteminis_pranesimas)}
          onChange={(e) =>
            setSettings({
              ...settings,
              siusti_email_sisteminis_pranesimas: Number(e.target.value) === 1 ?true:false,
            })
          }
        >
          <option value={1}>Taip</option>
          <option value={0}>Ne</option>
        </select>
      </div>
      <div className="flex items-left justify-left">
        <button
          onClick={handleApply}
          type="submit"
          className="w-full max-w-2xl py-2 flex text-neutral-300 bg-zinc-900 hover:bg-zinc-800 border border-none rounded-full justify-center hover:text-white transition duration-50"
        >
          Pritaikyti
        </button>
      </div>
    </>
  );
}
