'use client'
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  

  const [dropdownValue1, setDropdownValue1] = useState(''); // Initialize dropdown value
  const [dropdownValue2, setDropdownValue2] = useState(''); // Initialize another dropdown value
  const [yesNoValue, setYesNoValue] = useState(''); // Initialize yes/no value
  const [isChecked, setIsChecked] = useState(false); // Initialize checkbox value
  
  const handleDropdownChange1 = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDropdownValue1(e.target.value); // Update dropdown value 1
  };

  const handleDropdownChange2 = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDropdownValue2(e.target.value); // Update dropdown value 2
  };

  const handleYesNoChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setYesNoValue(e.target.value); // Update yes/no value
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox value
  };
  const handleApply = () => {
    console.log('Settings applied:');
    
  };

  return (
    <div className="flex flex-col items-left justify-center h-screen text-gray-500">
      <div>
        <select value={dropdownValue1} onChange={handleDropdownChange1}>
          <option value="">Pranešimų tipų gavimai</option>
          <option value="option1">Gauti visus pranešimus</option>
          <option value="option2">Gauti pranešimus tik apie komentarus</option>
          <option value="option2">Gauti pranešimus tik apie reklamas</option>
        </select>
      </div>

      <div>
        <select value={dropdownValue2} onChange={handleDropdownChange2}>
          <option value="">Pasirinkite pranešimų tematika</option>
          <option value="optionA">Balta</option>
          <option value="optionB">Juoda</option>
        </select>
      </div>

      <div>
  <label>
    Blokuoti visus pranešimus?:
    <input
      type="checkbox"
      value="Taip"
      checked={yesNoValue.includes('Taip')}
      onChange={handleYesNoChange}
    /> Taip
    <input
      type="checkbox"
      value="Ne"
      checked={yesNoValue.includes('Ne')}
      onChange={handleYesNoChange}
    /> Ne
  </label>
</div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          /> Pažymėkite šitą, jeigu norite nustatyti nustatymus į pradinę padėtį
        </label>
      </div>
      <div className="flex items-left justify-left">
          <button
            onClick={handleApply}
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 transition duration-300 text-white py-2 px-4 rounded-md">
            Pritaikyti
          </button>
      </div>
      <div className="flex flex-col items-left justify-center h-screen text-gray-500">
          <Link href="/pranesimai" className="hover:text-black transition duration-300">Grįžti atgal į pranešimus</Link>
      </div>
    </div>
  );
}
