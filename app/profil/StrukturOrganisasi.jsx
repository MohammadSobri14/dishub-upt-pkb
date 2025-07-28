"use client";

import React from "react";
import Image from "next/image";

const StrukturOrganisasi = () => {
  return (
    <section className="relative w-full bg-white text-gray-800 px-6 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-12 border-b-4 border-[#F3C623] inline-block">
          Struktur Organisasi
        </h2>

        {/* Kepala UPT */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg">
            <Image
              src="/images/kepala.jpg"
              alt="Kepala UPT"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-xl font-bold text-[#341B6E]">Kepala UPT</h3>
          <p className="text-[gray-600] text-sm">Budi Santoso, S.T.</p>
        </div>

        {/* Seksi di bawahnya */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Seksi Pelayanan Pengujian",
              name: "Siti Rahmawati, S.Kom",
              img: "/images/pelayanan.jpg",
            },
            {
              title: "Seksi Pengawasan & Evaluasi",
              name: "Dwi Hartono, M.T.",
              img: "/images/pengawasan.jpg",
            },
            {
              title: "Seksi Administrasi & Umum",
              name: "Lina Kartika, A.Md",
              img: "/images/administrasi.jpg",
            },
          ].map((person, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-md">
                <Image
                  src={person.img}
                  alt={person.title}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-lg font-semibold text-[#341B6E]">
                {person.title}
              </h4>
              <p className="text-gray-600 text-sm">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
