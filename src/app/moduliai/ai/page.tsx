'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [randomOpinion, setRandomOpinion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateRandomOpinion = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Define an array of random opinions
      const opinions: string[] = [
        "Mano nuomone, modulis apie dirbtinį intelektą yra ypatingai įdomus ir svarbus. Jis pristato mokinius į pačius pagrindus ir suteikia aiškų supratimą apie tai, kaip dirbtinis intelektas veikia mūsų kasdienį gyvenimą. Tai lemia mūsų ateitį ir galimybes.",
      
        "Studijuoti modulį apie duomenų analizę ir vizualizaciją man suteikė įspūdį apie tai, kaip galima naudoti duomenis efektyviai. Gebėjimas surinkti, analizuoti ir pateikti duomenis yra nepaprastai svarbus šių laikų pasauliui, ir šis modulis puikiai tai atskleidžia.",
      
        "Modulis apie kibernetinį saugumą yra išties reikšmingas. Saugumas internete tampa vis svarbesnis, ir šis modulis mokinius įtraukia į svarbius saugumo aspektus, tokius kaip šifravimas ir tinklo saugumas.",
      
        "Man ypač įdomus yra modulis apie mašininį mokymą. Tai sritis, kurią aiškina labai įdomiu ir suprantamu būdu. Mašininio mokymo taikymo galimybės yra begalės, ir jas suprasti yra įkvepiantys.",
      
        "Web kūrimo modulis yra puikus pradžios taškas, norint kurti modernius ir atsakomus tinklalapius. Tai suteikia pagrindą, kad galėčiau kurti gražius ir interaktyvius tinklalapius, kas yra labai patenkinama."
      ];

      // Get a random opinion from the array
      const randomIndex: number = Math.floor(Math.random() * opinions.length);
      const opinion: string = opinions[randomIndex];

      // Update the state to display the random opinion
      setRandomOpinion(opinion);
      setIsLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
  };

  useEffect(() => {
    // Initially, set a default message
    setRandomOpinion("Press 'Generuoti D.I. nuomonę' to get a random opinion.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 style={{ color: 'red' }}>Dirbtinio intelekto nuomonė</h1>
      <button className="flex justify-center" onClick={generateRandomOpinion} disabled={isLoading}>
        {isLoading ? 'Generuojama...' : 'Generuoti D.I. nuomonę'}
      </button>
      {randomOpinion && !isLoading && <p>{randomOpinion}</p>}
      <Link href="/moduliai">Atgal</Link>
    </div>
  );
}
