"use client";

import React from "react";

const LayananKami = () => {
  return (
    <section
      className="w-full min-h-screen px-8 text-gray-800 scroll-mt-25 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto text-center my-13">
        <h2 className="text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
          Layanan Kami
        </h2>
        <p className="mb-12 text-lg text-gray-600">
          Kami menyediakan layanan pengujian kendaraan bermotor untuk memastikan
          keselamatan dan kelayakan jalan.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Layanan 1 */}
          <div className="p-6 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
            <h3 className="text-xl font-semibold text-[#341B6E] mb-2">
              Uji Emisi
            </h3>
            <p className="text-sm text-gray-600">
              Pengujian emisi gas buang untuk memastikan kendaraan memenuhi
              standar lingkungan yang berlaku.
            </p>
          </div>

          {/* Layanan 2 */}
          <div className="p-6 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
            <h3 className="text-xl font-semibold text-[#341B6E] mb-2">
              Uji Rem & Lampu
            </h3>
            <p className="text-sm text-gray-600">
              Pemeriksaan sistem pengereman dan pencahayaan kendaraan untuk
              menjamin keselamatan.
            </p>
          </div>

          {/* Layanan 3 */}
          <div className="p-6 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
            <h3 className="text-xl font-semibold text-[#341B6E] mb-2">
              Uji Fisik Kendaraan
            </h3>
            <p className="text-sm text-gray-600">
              Pemeriksaan struktur fisik kendaraan termasuk sasis, bodi, dan
              sistem suspensi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayananKami;
