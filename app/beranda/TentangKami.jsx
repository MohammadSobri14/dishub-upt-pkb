"use client";

import SliderGallery from "../Components/SliderGallery";
import React from "react";

const TentangKami = () => {
  return (
    <section
      className="scroll-mt-24 w-full min-h-[633px] relative text-gray-800 px-8 overflow-hidden"
      style={{ backgroundImage: "url('/images/bg-batik.png')" }}
    >
      {/* Content Container */}
      <div className="flex flex-col-reverse items-center max-w-6xl gap-12 py-5 mx-auto md:flex-row">
        {/* Text Content */}
        <div className="w-full md:w-[40%]">
          <div className="relative w-full items-center top-25 md:w-full bg-white opacity-90 shadow-lg rounded-lg p-6">
            <h2 className="text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
              Tentang Kami
            </h2>
            <p className="leading-relaxed text-gray-700 indent-8 text-justify">
              UPT Pengujian Kendaraan Bermotor (PKB) merupakan unit pelaksana
              teknis di bawah naungan Dinas Perhubungan Kota Yogyakarta yang
              memiliki tugas utama dalam melaksanakan pelayanan pengujian
              kendaraan bermotor, baik kendaraan pribadi maupun angkutan umum,
              kereta gandengan, maupun kereta tempelan.
            </p>
            <p className="leading-relaxed text-gray-700 indent-8 mt-4 text-justify">
              Pengujian Kendaraan Bermotor adalah serangkaian kegiatan untuk
              mengukur, menguji, dan/atau memeriksa bagian-bagian teknis dan
              komponen kendaraan dalam rangka memastikan kendaraan tersebut
              memenuhi persyaratan teknis dan laik jalan, sebagaimana diatur
              dalam peraturan perundang-undangan yang berlaku.
            </p>
          </div>
        </div>

        {/* Slider Gallery */}
        <div className="w-full md:w-1/2">
          <div className="relative h-full top-22 md:h-full">
            <SliderGallery />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;
