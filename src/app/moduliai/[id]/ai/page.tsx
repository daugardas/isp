'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InputWrap from "@/components/InputWrap";
import Label from "@/components/Label";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

export default function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;



  const [randomOpinion, setRandomOpinion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateRandomOpinion = () => {
    setIsLoading(true);
    setTimeout(() => {
      const opinions: string[] = [
        "Mano nuomone, modulis apie dirbtinį intelektą yra ypatingai įdomus ir svarbus. Jis pristato mokinius į pačius pagrindus ir suteikia aiškų supratimą apie tai, kaip dirbtinis intelektas veikia mūsų kasdienį gyvenimą. Tai lemia mūsų ateitį ir galimybes.",
        "Studijuoti modulį apie duomenų analizę ir vizualizaciją man suteikė įspūdį apie tai, kaip galima naudoti duomenis efektyviai. Gebėjimas surinkti, analizuoti ir pateikti duomenis yra nepaprastai svarbus šių laikų pasauliui, ir šis modulis puikiai tai atskleidžia.",
        "Modulis apie kibernetinį saugumą yra išties reikšmingas. Saugumas internete tampa vis svarbesnis, ir šis modulis mokinius įtraukia į svarbius saugumo aspektus, tokius kaip šifravimas ir tinklo saugumas.",
        "Man ypač įdomus yra modulis apie mašininį mokymą. Tai sritis, kurią aiškina labai įdomiu ir suprantamu būdu. Mašininio mokymo taikymo galimybės yra begalės, ir jas suprasti yra įkvepiantys.",
        "Web kūrimo modulis yra puikus pradžios taškas, norint kurti modernius ir atsakomus tinklalapius. Tai suteikia pagrindą, kad galėčiau kurti gražius ir interaktyvius tinklalapius, kas yra labai patenkinama."
      ];

      const randomIndex: number = Math.floor(Math.random() * opinions.length);
      const opinion: string = opinions[randomIndex];

      setRandomOpinion(opinion);
      setIsLoading(false);
    }, 1500);
  };



  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <img
      src="https://logowik.com/content/uploads/images/openai-chat-gpt-5636.logowik.com.webp" //
      alt="Chat Icon"
      className="w-24 h-24 mb-4"/>
      <h1 className="text-4xl font-semibold text-red-600 mb-6">Dirbtinio Intelekto Nuomonė</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        onClick={generateRandomOpinion}
        disabled={isLoading}
      >
        {isLoading ? 'Generuojama...' : 'Generuoti D.I. nuomonę'}
      </button>
      {randomOpinion && !isLoading && <p className="mt-4 text-gray-800">{randomOpinion}</p>}
      <Link href={`/moduliai/${id}`} className="mt-4 underline text-blue-600">Atgal</Link>
    </div>
  );
}
