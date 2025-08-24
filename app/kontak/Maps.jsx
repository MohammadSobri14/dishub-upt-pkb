"use client";

import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Maps = () => {
  return (
    <section
      className="relative w-full px-4 md:px-6 mt-19 py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay abu-abu transparan */}
      <div className="absolute inset-0 bg-gray-900/40 z-0"></div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Kontak Info */}
        <div className="bg-[#0D0D61] text-white rounded-lg shadow-lg p-6 md:p-8 space-y-6 mx-auto lg:mx-0 w-full max-w-sm lg:w-[333px] lg:ml-10">
          <h2 className="text-2xl font-bold text-white mb-4 border-b-4 border-[#F3C623] inline-block">
            Kontak Kami
          </h2>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-xl mt-1" />
            <p>Office : Jl. Lingkar Selatan Umbulharjo, Yogyakarta 55163</p>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-xl mt-1" />
            <p>perhubungan@jogjakota.go.id</p>
          </div>

          <div className="flex items-start gap-4">
            <FaPhone className="text-xl mt-1" />
            <p>0858-7777-9520</p>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/20">
            <FaFacebookF className="cursor-pointer hover:text-[#F3C623]" />
            <FaTwitter className="cursor-pointer hover:text-[#F3C623]" />
            <FaInstagram className="cursor-pointer hover:text-[#F3C623]" />
          </div>
        </div>

        {/* Google Maps */}
        <div className="w-full bg-white rounded-2xl py-6 px-3 lg:px-0 lg:py-7 lg:-ml-[90px]">
          <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg lg:w-[720px] lg:ml-[120px]">
            <iframe
              title="Lokasi Uji Kir Jogjakarta"
              width="100%"
              height="400"
              className="border-0 w-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d406.5786246059933!2d110.393805!3d-7.836112000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a56e27b8a7703%3A0x71156b2d5bd0ab25!2sUji%20Kir%20Jogjakarta!5e1!3m2!1sid!2sus!4v1753425242736!5m2!1sid!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maps;
