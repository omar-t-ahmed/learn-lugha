"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

// Define a mapping of Arabic letters to their English sounds
const letterMapping: { [key: string]: string } = {
  'ج': 'j',    // jeem
  'ث': 'th',   // thaa
  'ت': 't',    // taa
  'ب': 'b',    // baa
  'ا': 'aa',   // alif
  'ر': 'r',    // raa
  'ذ': 'dh',   // dhaal
  'د': 'd',    // daal
  'خ': 'kh',   // khaa
  'ح': 'h',    // Haa (heavy H)
  'ض': 'd',    // Dhaa
  'ص': 's',    // Saad
  'ش': 'sh',   // Sheen
  'س': 's',    // Seen
  'ز': 'z',    // Zaa
  'ف': 'f',    // faa
  'غ': 'gh',   // ghayn
  'ع': '‘a',   // ‘ayn
  'ظ': 'dh',   // Thaa (heavy)
  'ط': 't',    // Taa (heavy)
  'ن': 'n',    // Noon
  'م': 'm',    // Meem
  'ل': 'l',    // Laam
  'ك': 'k',    // Kaaf
  'ق': 'q',    // Qaaf
  'ي': 'y',    // Yaa
  'و': 'w',    // Waw
  'ه': 'h'     // Haa (light H)
};

const LettersPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="md:ml-64 p-4 md:p-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">Arabic Letters</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {Object.keys(letterMapping).slice(0, -3).map((letter, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 md:p-6 text-3xl md:text-4xl font-bold"
            >
              <div>{letter}</div>
              <div className="text-lg md:text-xl mt-2">{letterMapping[letter]}</div>
            </div>
          ))}

          {/* Empty grid items to push last 3 letters to center */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"></div>

          {Object.keys(letterMapping).slice(-3).map((letter, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 md:p-6 text-3xl md:text-4xl font-bold"
            >
              <div>{letter}</div>
              <div className="text-lg md:text-xl mt-2">{letterMapping[letter]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LettersPage;