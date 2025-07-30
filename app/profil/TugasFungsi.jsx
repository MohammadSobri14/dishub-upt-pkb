"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const tugasFungsi = [
  "Melaksanakan pengujian berkala kendaraan bermotor",
  "Melaksanakan pengujian emisi gas buang kendaraan bermotor",
  "Melakukan penilaian teknis kendaraan bermotor (scrapping)",
  "Melakukan penilaian fisik kendaraan sebagai barang bukti hasil kejahatan",
];

const TugasFungsiPage = () => {
  return (
    <section className="relative pb-25 px-4 md:px-10 bg-gradient-to-b from-[#fdfcf9] to-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-10 pt-10 border-b-4 border-[#F3C623] inline-block">
            Tugas & Fungsi
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Unit Pelaksana Teknis Pengujian Kendaraan Bermotor (UPT PKB)
            memiliki tanggung jawab dalam menjamin keselamatan dan kelayakan
            kendaraan melalui berbagai tugas dan fungsi teknis.
          </p>
        </div>

        {/* List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tugasFungsi.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-5 bg-white border-l-4 border-[#F3C623] rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <div>
                <CheckCircle className="text-[#341B6E] w-6 h-6" />
              </div>
              <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TugasFungsiPage;
