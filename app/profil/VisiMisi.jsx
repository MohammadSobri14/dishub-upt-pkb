"use client";

import React from "react";
import Image from "next/image";

const VisiMisi = () => {
  return (
    <section className="relative w-full bg-white text-gray-800 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Judul Utama */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-10 pt-10 border-b-4 border-[#F3C623] inline-block">
          Visi & Misi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Bagian Teks */}
          <div>
            {/* Visi */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#341B6E] mb-3">
                Visi
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                Terwujudnya pengujian kendaraan bermotor yang profesional dan
                inovatif.
              </p>
            </div>

            {/* Misi */}
            <div>
              <h3 className="text-2xl font-semibold text-[#341B6E] mb-3">
                Misi
              </h3>
              <ul className="list-decimal pl-6 space-y-3 text-gray-700 text-justify">
                <li>
                  Menyelenggarakan pelayanan yang mudah, cepat, dan akurat.
                </li>
                <li>
                  Mewujudkan kendaraan yang berkeselamatan melalui keakuratan
                  hasil pengujian.
                </li>
                <li>
                  Meningkatkan profesionalisme penguji melalui peningkatan
                  kompetensi.
                </li>
                <li>
                  Mempertahankan alat uji yang terkalibrasi, akurat, dan
                  berkelanjutan.
                </li>
              </ul>
            </div>
          </div>

          {/* Bagian Gambar dengan teks */}
          <div className="relative px-20 w-full h-[350px] md:h-[479px] rounded-b-[30px] shadow-lg">
            {/* Gambar Utama */}
            <Image
              src="/images/visi-misi.png"
              alt="Visi Misi"
              fill
              className="object-cover rounded-b-[30px]"
            />

            {/* Overlay Text */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6 rounded-b-[30px]"
              style={{ backgroundColor: "rgba(13, 3, 99, 0.4)" }}
            >
              <p className="text-white max-w-[400px] text-sm md:text-lg font-semibold leading-relaxed text-center">
                "Di UPT PKB Dinas Perhubungan Kota Yogyakarta, kerja keras dan
                ketelitian menumbuhkan keselamatan dan kepercayaan masyarakat."
              </p>
            </div>

            {/* Icon Atas (hanya muncul di desktop) */}
            <div className="hidden md:block absolute top-12 translate-x-80 z-10">
              <Image
                src="/images/dot.png"
                alt="Icon Atas"
                width={400}
                height={140}
                className="object-contain"
              />
            </div>

            {/* Icon Bawah (hanya muncul di desktop) */}
            <div className="hidden md:block absolute bottom-9 translate-x-60 z-10">
              <Image
                src="/images/garis.png"
                alt="Icon Bawah"
                width={400}
                height={140}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
