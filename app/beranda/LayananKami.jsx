"use client";

import React from "react";
import {
  Car,
  ClipboardCheck,
  ArrowRightLeft,
  Share2,
  Factory,
  Ban,
} from "lucide-react";

const layanan = [
  {
    title: "Uji Berkala Pertama & Perpanjangan",
    icon: <ClipboardCheck className="w-10 h-10 text-white" />,
    desc: "Pemeriksaan rutin untuk memastikan kendaraan tetap laik jalan sesuai peraturan.",
  },
  {
    title: "Uji Berkala Pendaftaran KBWU",
    icon: <Factory className="w-10 h-10 text-white" />,
    desc: "Pendaftaran dan pengujian kendaraan bermotor wajib uji (KBWU) pertama kali.",
  },
  {
    title: "Mutasi Masuk",
    icon: <ArrowRightLeft className="w-10 h-10 text-white" />,
    desc: "Pengujian ulang kendaraan yang berpindah dari wilayah lain ke Yogyakarta.",
  },
  {
    title: "Layanan Rekomendasi Numpang Uji",
    icon: <Share2 className="w-10 h-10 text-white" />,
    desc: "Layanan penerbitan surat rekomendasi untuk pengujian di daerah lain.",
  },
  {
    title: "Uji Emisi",
    icon: <Car className="w-10 h-10 text-white" />,
    desc: "Pengujian emisi gas buang kendaraan untuk memastikan ramah lingkungan.",
  },
  {
    title: "Uji Non KBWU",
    icon: <Ban className="w-10 h-10 text-white" />,
    desc: "Pengujian kendaraan yang tidak termasuk kategori wajib uji KBWU.",
  },
];

const LayananKami = () => {
  return (
    <section
      className="w-full flex items-center min-h-screen px-8 py-9 scroll-mt-25 bg-gray-50"
      style={{ backgroundImage: "url('/images/bg-batik.png')" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
          Layanan Kami
        </h2>
        <p className="mb-12 text-lg text-black">
          Kami menyediakan layanan pengujian kendaraan bermotor untuk memastikan
          keselamatan dan kelayakan jalan.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {layanan.map((item, index) => (
            <div
              key={index}
              className="p-6 transition duration-300 bg-[#341B6E] text-white shadow-md rounded-xl hover:shadow-lg text-left"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayananKami;
