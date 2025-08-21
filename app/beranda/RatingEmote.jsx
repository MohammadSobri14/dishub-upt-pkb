"use client";

import React, { useState } from "react";

const emotes = [
  { icon: "😡", label: "Sangat Tidak Puas" },
  { icon: "😕", label: "Tidak Puas" },
  { icon: "😐", label: "Netral" },
  { icon: "🙂", label: "Puas" },
  { icon: "😍", label: "Sangat Puas" },
];

export default function RatingEmote() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="text-center p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
        Penilaian Layanan Informasi
      </h1>

      {/* Paragraf responsif */}
      <p className="text-gray-600 mb-6 text-center md:text-left text-sm md:text-base leading-relaxed">
        Kami terus berupaya meningkatkan kualitas pelayanan pengujian kendaraan
        bermotor.
        <br /> Silakan isi survei berikut untuk memberikan penilaian anda
        terhadap layanan kami. Pendapat anda sangat berarti bagi peningkatan
        mutu pelayanan ke depan.
      </p>

      <div className="flex justify-center gap-6 flex-wrap">
        {emotes.map((e, idx) => {
          const isSelected = selected === idx;
          const isDisabled = selected !== null && !isSelected;

          return (
            <div key={idx} className="flex flex-col items-center">
              <button
                onClick={() => {
                  if (selected === null) setSelected(idx);
                }}
                disabled={isDisabled}
                className={`group relative focus:outline-none p-2 rounded-full transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-blue-500"
                    : isDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : ""
                }`}
                aria-label={e.label}
                title={e.label}
              >
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-blue-300 opacity-50 animate-ping z-0"></span>
                )}
                <span
                  className={`text-5xl inline-block ${
                    !isDisabled
                      ? "hover:scale-125 hover:animate-bounce cursor-pointer transition-transform duration-300 ease-in-out"
                      : ""
                  }`}
                >
                  {e.icon}
                </span>
              </button>
              <p className="mt-2 text-sm text-gray-600">{e.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
