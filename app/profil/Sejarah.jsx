"use client";

import React from "react";

const SejarahSection = () => {
  return (
    <section className="relative w-full bg-white text-gray-800 px-6 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
          Sejarah Singkat / Latar Belakang
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify indent-8">
          UPT Pengujian Kendaraan Bermotor dibentuk sebagai unit teknis untuk
          menjamin kelayakan dan keamanan kendaraan bermotor di Kota Yogyakarta.
          Sebagai bagian dari Dinas Perhubungan, unit ini berperan penting dalam
          melaksanakan pengujian berkala terhadap kendaraan pribadi maupun
          angkutan umum, guna memastikan terpenuhinya persyaratan teknis dan
          laik jalan.
        </p>
        <p className="text-gray-700 leading-relaxed text-justify indent-8 mt-4">
          Pembentukan UPT PKB didasarkan pada kebutuhan untuk meningkatkan
          keselamatan berlalu lintas serta mendukung pelaksanaan regulasi yang
          telah ditetapkan pemerintah, khususnya dalam bidang transportasi
          darat.
        </p>
      </div>
    </section>
  );
};

export default SejarahSection;
