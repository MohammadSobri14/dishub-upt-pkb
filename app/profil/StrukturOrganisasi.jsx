"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StrukturOrganisasi = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="pb-12 px-4 bg-white flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-8 border-b-4 border-[#F3C623]">
        Struktur Organisasi
      </h2>

      {/* Gambar dengan efek hover */}
      <div
        onClick={() => setShowModal(true)}
        className="relative group cursor-pointer rounded-lg overflow-hidden w-full max-w-5xl"
      >
        <Image
          src="/images/struktur-organisasi.jpg"
          alt="Struktur Organisasi"
          width={1200}
          height={800}
          className="object-contain w-full h-auto transition duration-300 group-hover:blur-sm"
        />
        <div className="absolute inset-0 bg-gray-400/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-[#29105c] hover:bg-[#392e4f] text-white px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-2xl cursor-pointer">
            <Eye className="w-4 h-4" /> Lihat Struktur
          </button>
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
              className="bg-white rounded-xl shadow-xl w-full max-w-5xl relative p-6"
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
                Struktur Organisasi UPT PKB
              </h3>

              {/* Gambar besar */}
              <div className="overflow-hidden rounded-md">
                <Image
                  src="/images/struktur-organisasi.jpg"
                  alt="Struktur Organisasi"
                  width={1400}
                  height={900}
                  className="object-contain w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StrukturOrganisasi;
