"use client";

import React, { useState } from "react";
import { FileDown, Eye, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const AkreditasiPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="py-16 px-4 md:px-10 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] border-b-4 border-[#F3C623] inline-block pb-2">
            Akreditasi UPT PKB
          </h2>
          <p className="text-gray-700 text-sm md:text-base mt-4 max-w-4xl mx-auto leading-relaxed">
            UPT PKB Dishub Kota Yogyakarta telah terakreditasi oleh Kementrian
            Perhubungan Direktorat Jenderal Perhubungan Darat.
            <br />
            Ini menjadi bukti bahwa pelayanan pengujian kendaraan bermotor memenuhi
            standar mutu dan keselamatan nasional.
          </p>
        </div>

        {/* Gambar dengan hover */}
        <div className="flex justify-center">
          <div
            onClick={() => setShowModal(true)}
            className="relative group cursor-pointer rounded-lg overflow-hidden w-fit"
          >
            <Image
              src="/images/plakat-akreditasi.png"
              alt="Plakat Sertifikat Akreditasi"
              width={600}
              height={400}
              className="rounded-lg object-cover transition duration-300 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-gray-400/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-[#29105c] hover:bg-[#392e4f] cursor-pointer text-white px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-2xl">
                <Eye className="w-4 h-4" /> Lihat Sertifikat
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl w-full max-w-3xl relative p-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                {/* Tombol close */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#341B6E]">
                  Sertifikat Akreditasi UPT PKB
                </h3>

                {/* Sertifikat */}
                <div className="overflow-hidden rounded-md mb-6">
                  <Image
                    src="/images/plakat-akreditasi.png"
                    alt="Sertifikat"
                    width={1000}
                    height={700}
                    className="object-contain w-full"
                  />
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/files/sertifikat-akreditasi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#341B6E] hover:bg-[#29105c] cursor-pointer text-white px-5 py-2 rounded-full text-sm font-medium transition"
                  >
                    <FileDown className="w-4 h-4" />
                    Unduh Sertifikat
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AkreditasiPage;
