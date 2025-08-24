"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Loket Pemeriksaan Berkas",
    desc: "Tanpa turun dari kendaraan, serahkan dan cek kelengkapan berkasmu di sini.",
    image: "/images/1.jpg",
    style: "top-[70px] left-[80px]",
  },
  {
    title: "Loket Cetak Berkas Lulus Uji",
    desc: "Hasil uji kendaraan bisa langsung dicetak tanpa antre lama.",
    image: "/images/2.jpg",
    style: "top-[240px] right-[60px]",
  },
  {
    title: "Loket Pelayanan Numpang Uji / Mutasi",
    desc: "Khusus untuk anda yang butuh layanan pindah uji atau mutasi kendaraan.",
    image: "/images/3.jpg",
    style: "top-[380px] left-[80px]",
  },
  {
    title: "Pemeriksaan Teknis",
    desc: "Pastikan kendaraan dalam kondisi prima dan memenuhi seluruh persyaratan teknis sebelum memasuki area ini.",
    image: "/images/4.jpg",
    style: "top-[600px] right-[60px]",
  },
];

const Loket = () => {
  return (
    <section className="relative min-h-screen bg-white py-16 px-4 md:px-20 overflow-hidden">
      {/* Judul */}
      <h2 className="text-3xl md:text-4xl ml-3 -mt-4 mb-9 font-bold text-[#341B6E] border-b-4 border-[#F3C623] inline-block">
        Loket Kami
      </h2>

      {/* Background Jalur - Hanya Desktop */}
      <div className="hidden lg:block absolute top-0 left-[680px] -translate-x-1/2 h-full z-0 pointer-events-none">
        <Image
          src="/images/alur-loket.png"
          alt="Jalan"
          width={500}
          height={1000}
          className="h-full object-contain"
        />
      </div>

      {/* Steps Container */}
      <div className="relative z-10 w-full lg:h-[1000px]">
        {/* Mobile/Tablet pakai grid, Desktop pakai absolute */}
        <div className="grid grid-cols-1 gap-8 lg:block">
          {steps.map((step, index) => {
            const { ref, inView } = useInView({ threshold: 0.3 });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className={`${step.style} ${
                  index % 2 === 0 ? "lg:absolute" : "lg:absolute"
                } flex justify-center`}
              >
                <div
                  className="w-full max-w-[350px] bg-white rounded-2xl shadow-lg px-6 py-6 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6
                  transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Text */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-md font-bold text-[#341B6E] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-sm">{step.desc}</p>
                  </div>

                  {/* Image */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={300}
                      height={300}
                      className="rounded-xl object-cover w-[150px] h-[150px]"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Loket;
