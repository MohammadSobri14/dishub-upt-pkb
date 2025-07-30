"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Komponen kartu per orang
const PersonCard = ({ title, name, img }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white rounded-lg shadow-md px-4 pt-6 pb-4 w-40 border hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-[#F3C623] rounded-b" />
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#F3C623] mx-auto mb-2">
        <Image
          src={img}
          alt={name}
          width={80}
          height={100}
          className="object-cover scale-125 transition-transform duration-300"
        />
      </div>
      <div className="text-center">
        <p className="text-[11px] text-gray-600 leading-tight">{title}</p>
        <p className="text-[10px] font-semibold text-[#341B6E] mt-1">{name}</p>
      </div>
    </motion.div>
  );
};

// Fungsi untuk mencocokkan nama dengan gambar
const getImageForName = (name) => {
  const mapping = {
    "Supriyanto, A.Md": "/images/supriyanto.jpg",
    "Afiat Arfianto, S.T, M.T.": "/images/afiat.jpg",
    Kiswandi: "/images/kiswandi.jpg",
    "Tri Atmaji": "/images/triatmaji.jpg",
    "Susetiyo, A.Md PKB": "/images/susetiyo.jpg",
    "Andika Satya Wibrama, A.Md PKB": "/images/andika.jpg",
    "Oktavian Putra, A.Md PKB": "/images/vian.jpg",
    "Enggar Listyo Pambudi, A.Md PKB": "/images/enggar.jpg",
    "Lukas Widhi Wahyuaji, A.Md PKB": "/images/lukas.jpg",
    "Arif Budi Prakoso, A.Md PKB": "/images/arifbudi.jpg",
    "Agus Saktiono, A.Md PKB": "/images/sakti.jpg",
    "Teja Pramana Nagoro, A.Md": "/images/teja.jpg",
    "Rifto Orvan": "/images/rifto.jpg",
    default: "/images/default.jpg",
  };

  return mapping[name] || mapping.default;
};

// Garis vertikal
const GarisVertikal = ({ height = "h-6" }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: 24 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className={`w-[2px] bg-gray-300 ${height}`}
  />
);

// Garis horizontal
const GarisHorizontal = () => (
  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 z-0 animate-line-x" />
);

// Komponen utama
const StrukturOrganisasi = () => {
  const pengujiMahir = [
    "Supriyanto, A.Md",
    "Afiat Arfianto, S.T, M.T.",
    "Kiswandi",
  ];

  const pengujiTerampil = [
    "Tri Atmaji",
    "Susetiyo, A.Md PKB",
    "Andika Satya Wibrama, A.Md PKB",
    "Oktavian Putra, A.Md PKB",
    "Enggar Listyo Pambudi, A.Md PKB",
    "Lukas Widhi Wahyuaji, A.Md PKB",
    "Arif Budi Prakoso, A.Md PKB",
    "Agus Saktiono, A.Md PKB",
  ];

  return (
    <section className="pb-12 px-4 bg-white overflow-x-auto">
      <div className="flex justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-12 border-b-4 border-[#F3C623]">
          Struktur Organisasi
        </h2>
      </div>

      <div className="flex flex-col py-3 items-center space-y-10">
        {/* Kepala UPT */}
        <PersonCard
          title="Kepala UPT PKB"
          name="Bayu Setyawan Heru P., S.SiT., M.T"
          img="/images/bayu.jpg"
        />

        <GarisVertikal />

        <div className="w-full flex justify-center relative overflow-x-auto">
          <GarisHorizontal />

          <div className="flex justify-center gap-16 relative z-10">
            {/* TU */}
            <div className="flex flex-col items-center">
              <PersonCard
                title="Kepala Sub Bagian TU"
                name="Nur Hayati, S.E., M.M."
                img="/images/nurhayati.jpg"
              />
            </div>

            {/* Penguji */}
            <div className="flex flex-col items-center">
              <PersonCard
                title="Penguji Penyelia"
                name="Mardi Utomo"
                img="/images/mardi.jpg"
              />

              <GarisVertikal />

              <div className="flex space-x-4 flex-wrap justify-center">
                {pengujiMahir.map((name, i) => (
                  <PersonCard
                    key={i}
                    title="Penguji Mahir"
                    name={name}
                    img={getImageForName(name)}
                  />
                ))}
              </div>

              <GarisVertikal height="h-6 my-2" />

              <div className="grid py-2 grid-cols-2 md:grid-cols-4 gap-3">
                {pengujiTerampil.map((name, i) => (
                  <PersonCard
                    key={i}
                    title="Penguji Terampil"
                    name={name}
                    img={getImageForName(name)}
                  />
                ))}
              </div>
            </div>

            {/* Tenaga Teknis */}
            <div className="flex flex-col items-center">
              <PersonCard
                title="Tenaga Teknis"
                name="Teja Pramana Nagoro, A.Md"
                img={getImageForName("Teja Pramana Nagoro, A.Md")}
              />
              <GarisVertikal />
              <PersonCard
                title="Tenaga Teknis"
                name="Rifto Orvan"
                img={getImageForName("Rifto Orvan")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
