'use client'
import { auth } from "@/lib/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import React, { useState } from "react";

export default  function Page() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/pranesimai');
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const message = "Žinutė, kuria norime ištrinti";
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="message-container">
          <div 
            className="text-lg text-gray-700">{message}
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          </label>
      </div>
      {isChecked && (
      <div className="flex items-left justify-left">
          <button
            onClick={handleDelete}
            type="submit"
            className="bg-blue-400 hover:bg-red-800 transition duration-1000 ease text-white py-2 px-4 rounded-md">
            Ištrinti pasirinktas žinutes
          </button>
      </div>
      )}
      
      <div className="flex flex-col items-left justify-center h-screen text-gray-500">
          <Link href="/pranesimai" className="hover:text-black transition duration-300">Grįžti atgal į pranešimus</Link>
      </div>
    </div>
  );
}
