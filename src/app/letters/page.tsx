"use client"
import React from "react";
import Sidebar from "@/components/Sidebar";

// Define a mapping of Arabic letters to their corresponding sound file names
const letterMapping: { [key: string]: { english: string, soundFile: string } } = {
  'ج': { english: 'jeem', soundFile: '005-jeem.mp3' },
  'ث': { english: 'tha', soundFile: '004-tha.mp3' },
  'ت': { english: 'taa', soundFile: '003-taa.mp3' },
  'ب': { english: 'baa', soundFile: '002-ba.mp3' },
  'ا': { english: 'alif', soundFile: '001-alif.mp3' },
  'ر': { english: 'raa', soundFile: '010-raa.mp3' },
  'ذ': { english: 'dhaal', soundFile: '009-dhal.mp3' },
  'د': { english: 'daal', soundFile: '008-dal.mp3' },
  'خ': { english: 'Khaa', soundFile: '007-khaa.mp3' },
  'ح': { english: 'Haa', soundFile: '006-haa.mp3' },
  'ض': { english: 'Dhaad', soundFile: '015-dhaad.mp3' },
  'ص': { english: 'Saad', soundFile: '014-saad.mp3' },
  'ش': { english: 'sheen', soundFile: '013-sheen.mp3' },
  'س': { english: 'seen', soundFile: '012-seen.mp3' },
  'ز': { english: 'zaa', soundFile: '011-zaa.mp3' },
  'ف': { english: 'faa', soundFile: '020-faa.mp3' },
  'غ': { english: 'Ghayn', soundFile: '019-ghain.mp3' },
  'ع': { english: '‘ayn', soundFile: '018-ain.mp3' },
  'ظ': { english: 'Dhaa', soundFile: '017-dhaa.mp3' },
  'ط': { english: 'Taa', soundFile: '016-toa.mp3' },
  'ن': { english: 'noon', soundFile: '025-noon.mp3' },
  'م': { english: 'meem', soundFile: '024-meem.mp3' },
  'ل': { english: 'laam', soundFile: '023-laam.mp3' },
  'ك': { english: 'kaaf', soundFile: '022-kaaf.mp3' },
  'ق': { english: 'Qaaf', soundFile: '021-qaaf.mp3' },
  'ي': { english: 'yaa', soundFile: '029-yaa.mp3' },
  'و': { english: 'waw', soundFile: '026-waw.mp3' },
  'ه': { english: 'haa', soundFile: '027-ha.mp3' }
};

const LettersPage: React.FC = () => {
  const playSound = (soundFile: string) => {
    const filePath = `/sounds/${soundFile}`; // Corrected path to reference the "sounds" folder in the public directory
    const audio = new Audio(filePath);
  
    audio.play().then(() => {
    }).catch(error => {
      console.error('Error playing sound:', error.message);
    });
};

  


  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="md:ml-64 p-4 md:p-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">Arabic Letters</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {Object.keys(letterMapping).slice(0, -3).map((letter, index) => (
            <div
              key={index}
              onClick={() => playSound(letterMapping[letter].soundFile)}
              className="cursor-pointer flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 md:p-6 text-3xl md:text-4xl font-bold"
            >
              <div>{letter}</div>
              <div className="text-lg md:text-xl mt-2">{letterMapping[letter].english}</div>
            </div>
          ))}

          {/* Empty grid items to push last 3 letters to center */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"></div>

          {Object.keys(letterMapping).slice(-3).map((letter, index) => (
            <div
              key={index}
              onClick={() => playSound(letterMapping[letter].soundFile)}
              className="cursor-pointer flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 md:p-6 text-3xl md:text-4xl font-bold"
            >
              <div>{letter}</div>
              <div className="text-lg md:text-xl mt-2">{letterMapping[letter].english}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LettersPage;
