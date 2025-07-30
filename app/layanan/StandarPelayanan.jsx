"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const data = [
  {
    image: "/images/1.jpg",
    title: "Uji Berkala – Pendaftaran",
    syarat: [
      "STNK asli yang masih berlaku/pajak aktif",
      "FC KTP pemilik / Surat Kuasa (PT/CV/Biro Jasa)",
      "Sertifikat Registrasi Uji Tipe (SRUT) dan KIR",
      "Surat Keterangan Rubah Bentuk (jika ada)",
      "Tera untuk kendaraan bermuatan",
    ],
    prosedur: [
      "Pemohon melakukan pendaftaran melalui aplikasi JSS menu SI REGOL.",
      "Pilih menu BOOKING.",
      "Pilih menu UJI BERKALA PENDAFTARAN.",
      "Pilih “Ya” untuk langsung booking uji pertama atau “Tidak”.",
      "Jika “Ya”, lengkapi formulir permohonan, lalu dokumen dapat diunduh melalui menu BOOKING AKTIF.",
      "Surat Keterangan Pendaftaran KBWU dapat dicetak pada menu UJI BERKALA - PENDAFTARAN.",
    ],
    produk: "Surat Keterangan Pendaftaran KBWU",
  },
  {
    image: "/images/2.jpg",
    title: "Uji Berkala Pertama / Uji Ulang",
    syarat: [
      "STNK asli dan KIR yang masih berlaku",
      "FC KTP pemohon / Surat Kuasa",
      "Bukti Pembayaran Retribusi",
      "Kendaraan dalam kondisi siap uji",
    ],
    prosedur: [
      "Pemohon melakukan pendaftaran melalui aplikasi JSS menu SI REGOL.",
      "Pemeriksaan Berkas Persyaratan.",
      "Pemeriksaan Kendaraan di gedung uji teknis.",
      "Pemohon mendapatkan catatan hasil uji.",
      "Pemohon menuju loket drive thru untuk cetak bukti lulus uji.",
    ],
    produk: "Bukti Lulus Uji Berkala",
  },
  {
    image: "/images/3.jpg",
    title: "Rekomendasi Numpang Uji",
    syarat: [
      "Foto STNK yang masih berlaku",
      "FC KTP pemohon / Surat Kuasa",
      "FC Bukti Lulus Uji",
    ],
    prosedur: [
      "Pemohon mendaftar melalui aplikasi JSS menu SI REGOL.",
      "Pilih menu LARE ANGON.",
      "Lengkapi formulir dan dokumen persyaratan.",
      "Verifikasi dan validasi data oleh petugas.",
      "Jika permohonan disetujui, dokumen dapat diunduh setelah menyelesaikan survei kepuasan masyarakat.",
    ],
    produk: "Surat Rekomendasi Numpang Uji",
  },
  {
    image: "/images/4.jpg",
    title: "Rekomendasi Mutasi Uji",
    syarat: [
      "FC STNK yang masih berlaku",
      "FC KTP pemilik / Surat Kuasa",
      "FC Bukti Lulus Uji",
    ],
    prosedur: [
      "Pemohon melakukan pendaftaran di loket administrasi.",
      "Petugas memverifikasi dokumen.",
      "Pemohon mendapatkan Surat Rekomendasi Mutasi Uji dan Kartu Induk Kendaraan.",
    ],
    produk: "Surat Rekomendasi Mutasi Uji",
  },
  {
    image: "/images/2.jpg",
    title: "Uji Non KBWU",
    syarat: ["STNK asli yang masih berlaku", "KTP pemohon"],
    prosedur: [
      "Pemohon melakukan pendaftaran melalui aplikasi JSS menu SI REGOL.",
      "Pemeriksaan Berkas Persyaratan.",
      "Pemeriksaan kendaraan di gedung uji teknis.",
      "Pemohon mendapatkan Surat Keterangan Hasil Pengujian.",
    ],
    produk: "Surat Keterangan Hasil Pengujian",
  },
  {
    image: "/images/1.jpg",
    title: "Uji Emisi",
    syarat: ["STNK asli yang masih berlaku", "KTP pemohon"],
    prosedur: [
      "Pemohon melakukan pendaftaran melalui JSS menu SI REGOL.",
      "Pemeriksaan berkas dilakukan di loket drive thru.",
      "Pemeriksaan kendaraan dilakukan di gedung uji teknis.",
      "Pemohon mendapatkan Surat Keterangan Hasil Pengujian Emisi dan Stiker (jika lulus uji).",
    ],
    produk: "Surat Keterangan Hasil Pengujian Emisi & Stiker",
  },
];

const StandarPelayanan = () => {
  const [index, setIndex] = useState(0);
  const item = data[index];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleDotClick = (i) => {
    setIndex(i);
  };

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6 md:px-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] border-b-4 border-[#F3C623] inline-block">
          Standar Pelayanan Publik
        </h2>
        <Image
          src="/images/garis.png"
          alt="Garis"
          width={120}
          height={40}
          className="object-contain h-10 w-auto"
        />
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Gambar kiri */}
        <div className="relative rounded-xl overflow-hidden max-w-[600px] w-full shadow-md h-[400px]">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-[#341B6E] p-2 rounded-full shadow z-10 hover:cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#341B6E] p-2 rounded-full shadow z-10 hover:cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Deskripsi */}
        <div className="bg-blue-800 text-white rounded-xl p-6 md:p-8 w-full max-w-xl shadow-md min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <div className="mb-4">
                <h4 className="font-semibold">Syarat:</h4>
                <ul className="list-disc ml-5 text-sm md:text-base">
                  {item.syarat.map((syarat, i) => (
                    <li key={i}>{syarat}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold">Prosedur:</h4>
                <ol className="list-decimal ml-5 text-sm md:text-base space-y-1">
                  {item.prosedur.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <p className="font-semibold text-sm md:text-base">
                Produk Layanan:{" "}
                <span className="font-normal">{item.produk}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Indicator */}
      <div className="flex justify-center mt-6 space-x-3">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-[#341B6E] scale-125" : "bg-gray-300 border"
            }`}
          ></button>
        ))}
      </div>
      <Image
        src="/images/garis.png"
        alt="Garis"
        width={120}
        height={40}
        className="object-contain h-10 w-auto"
      />
    </section>
  );
};

export default StandarPelayanan;
