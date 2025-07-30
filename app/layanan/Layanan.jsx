"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const layananList = [
  {
    title: "Uji Berkala Pertama & Perpanjangan",
    description:
      "Layanan ini ditujukan bagi kendaraan bermotor yang telah memiliki nomor uji dan terdaftar sebagai Kendaraan Bermotor Wajib Uji (KBWU) di Kota Yogyakarta. Pengujian dilakukan secara berkala untuk memastikan kendaraan tetap memenuhi persyaratan teknis dan laik jalan.",
    details: [
      "Uji Berkala Pertama: Pengujian perdana bagi kendaraan baru atau kendaraan pindahan dari daerah lain.",
      "Perpanjangan Uji Berkala: Pengujian lanjutan yang dilakukan secara rutin sesuai jadwal (biasanya setiap 6 bulan).",
    ],
    closing:
      "Uji berkala ini wajib dilakukan untuk menjaga keselamatan berkendara, mendukung tertib lalu lintas, serta mengurangi risiko pencemaran lingkungan.",
    image: "/images/drive-thru.jpg",
  },
  {
    title: "Uji Berkala Pendaftaran KBWU",
    description:
      "Layanan ini ditujukan bagi kendaraan bermotor yang telah memiliki nomor uji dan terdaftar sebagai Kendaraan Bermotor Wajib Uji (KBWU) di Kota Yogyakarta. Pengujian dilakukan secara berkala untuk memastikan kendaraan tetap memenuhi persyaratan teknis dan laik jalan.",
    details: [
      "Uji Berkala Pertama: Pengujian perdana bagi kendaraan baru atau kendaraan pindahan dari daerah lain.",
      "Perpanjangan Uji Berkala: Pengujian lanjutan yang dilakukan secara rutin sesuai jadwal (biasanya setiap 6 bulan).",
    ],
    closing:
      "Uji berkala ini wajib dilakukan untuk menjaga keselamatan berkendara, mendukung tertib lalu lintas, serta mengurangi risiko pencemaran lingkungan.",
    image: "/images/1.jpg",
  },
  {
    title: "Mutasi Masuk",
    description:
      "Layanan ini ditujukan bagi kendaraan bermotor yang telah memiliki nomor uji dan terdaftar sebagai Kendaraan Bermotor Wajib Uji (KBWU) di Kota Yogyakarta. Pengujian dilakukan secara berkala untuk memastikan kendaraan tetap memenuhi persyaratan teknis dan laik jalan.",
    details: [
      "Uji Berkala Pertama: Pengujian perdana bagi kendaraan baru atau kendaraan pindahan dari daerah lain.",
      "Perpanjangan Uji Berkala: Pengujian lanjutan yang dilakukan secara rutin sesuai jadwal (biasanya setiap 6 bulan).",
    ],
    closing:
      "Uji berkala ini wajib dilakukan untuk menjaga keselamatan berkendara, mendukung tertib lalu lintas, serta mengurangi risiko pencemaran lingkungan.",
    image: "/images/2.jpg",
  },
  {
    title: "Layanan Rekomendasi Numpang Uji",
    description:
      "Layanan ini ditujukan bagi kendaraan bermotor yang telah memiliki nomor uji dan terdaftar sebagai Kendaraan Bermotor Wajib Uji (KBWU) di Kota Yogyakarta. Pengujian dilakukan secara berkala untuk memastikan kendaraan tetap memenuhi persyaratan teknis dan laik jalan.",
    details: [
      "Uji Berkala Pertama: Pengujian perdana bagi kendaraan baru atau kendaraan pindahan dari daerah lain.",
      "Perpanjangan Uji Berkala: Pengujian lanjutan yang dilakukan secara rutin sesuai jadwal (biasanya setiap 6 bulan).",
    ],
    closing:
      "Uji berkala ini wajib dilakukan untuk menjaga keselamatan berkendara, mendukung tertib lalu lintas, serta mengurangi risiko pencemaran lingkungan.",
    image: "/images/3.jpg",
  },
  {
    title: "Uji Emisi",
    description:
      "Layanan ini ditujukan bagi kendaraan bermotor yang telah memiliki nomor uji dan terdaftar sebagai Kendaraan Bermotor Wajib Uji (KBWU) di Kota Yogyakarta. Pengujian dilakukan secara berkala untuk memastikan kendaraan tetap memenuhi persyaratan teknis dan laik jalan.",
    details: [
      "Uji Berkala Pertama: Pengujian perdana bagi kendaraan baru atau kendaraan pindahan dari daerah lain.",
      "Perpanjangan Uji Berkala: Pengujian lanjutan yang dilakukan secara rutin sesuai jadwal (biasanya setiap 6 bulan).",
    ],
    closing:
      "Uji berkala ini wajib dilakukan untuk menjaga keselamatan berkendara, mendukung tertib lalu lintas, serta mengurangi risiko pencemaran lingkungan.",
    image: "/images/4.jpg",
  },
  {
    title: "Uji Non KBWU",
    description:
      "Layanan ini ditujukan bagi kendaraan bermotor yang telah memiliki nomor uji dan terdaftar sebagai Kendaraan Bermotor Wajib Uji (KBWU) di Kota Yogyakarta. Pengujian dilakukan secara berkala untuk memastikan kendaraan tetap memenuhi persyaratan teknis dan laik jalan.",
    details: [
      "Uji Berkala Pertama: Pengujian perdana bagi kendaraan baru atau kendaraan pindahan dari daerah lain.",
      "Perpanjangan Uji Berkala: Pengujian lanjutan yang dilakukan secara rutin sesuai jadwal (biasanya setiap 6 bulan).",
    ],
    closing:
      "Uji berkala ini wajib dilakukan untuk menjaga keselamatan berkendara, mendukung tertib lalu lintas, serta mengurangi risiko pencemaran lingkungan.",
    image: "/images/2.jpg",
  },
];

const LayananSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % layananList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? layananList.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % layananList.length);
    }, 7000); // ganti setiap 5 detik

    return () => clearInterval(interval); // bersihkan interval saat unmount
  }, []);

  const layanan = layananList[index];

  return (
    <section
      className="w-full px-6 mt-12 py-10 bg-gray-50 bg-repeat"
      style={{ backgroundImage: "url('/images/bg-batik.png')" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Judul Section */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-4 border-b-4 border-[#F3C623] inline-block">
            Layanan Kami
          </h2>
        </div>

        {/* Deskripsi UPT */}
        <div className="mb-6">
          <p className="relative left-42 max-w-3xl mx-auto bg-[#341B6E] text-sm text-white px-4 py-3 rounded-md shadow-sm">
            <strong>UPT Pengujian Kendaraan Bermotor (PKB)</strong> Dinas
            Perhubungan Kota Yogyakarta menyediakan berbagai layanan terkait
            pengujian teknis kendaraan bermotor sebagai bagian dari upaya
            menjaga keselamatan dan kelayakan kendaraan di jalan.
          </p>
        </div>

        {/* Konten */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Gambar */}
          <div className="md:w-[500px] h-[360px] -mt-4 md:-mt-14 flex justify-center items-center rounded-lg shadow-md bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={layanan.image}
                src={layanan.image}
                alt={layanan.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-[295px] h-[310px] rounded-lg object-cover overflow-hidden shadow-md"
              />
            </AnimatePresence>
          </div>

          {/* Deskripsi */}
          <div className="md:w-2/3 w-full bg-white p-6 rounded-xl shadow-md border">
            <AnimatePresence mode="wait">
              <motion.div
                key={layanan.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#341B6E] mb-4 border-b-4 border-[#F3C623] inline-block">
                  {layanan.title}
                </h3>
                <p className="mb-3 text-gray-700">{layanan.description}</p>
                <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700">
                  {layanan.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-gray-700">{layanan.closing}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigasi & Indikator */}
        <div className="flex flex-col items-center justify-center mt-8 space-y-4">
          {/* Tombol Navigasi */}
          <div className="flex gap-5 ml-250">
            <button
              onClick={handlePrev}
              className="text-[#341B6E] hover:text-yellow-500 cursor-pointer border bg-gray-50 rounded-full p-2"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="text-[#341B6E] hover:text-yellow-500 cursor-pointer border bg-gray-50 rounded-full p-2"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Indikator */}
          <div className="flex -mt-11 gap-2">
            {layananList.map((_, i) => (
              <motion.span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-[#341B6E]" : "bg-gray-300"
                }`}
                animate={{
                  scale: i === index ? 1.4 : 1,
                  transition: { duration: 0.3 },
                }}
              ></motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayananSection;
