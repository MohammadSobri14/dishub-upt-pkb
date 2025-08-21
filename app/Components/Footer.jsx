import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-10 text-white overflow-hidden">
      {/* Background kota */}
      <div className="max-w-full">
        <img
          src="/images/bg-kota-1.png"
          alt="Background Kota"
          className="w-full object-cover"
        />
      </div>

      {/* Konten utama */}
      <div className="max-w-full bg-[#120378] mx-auto px-4 sm:px-6 lg:px-12 pt-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Kiri: Logo dan nama instansi */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo-dishub.png"
              alt="Logo Dishub"
              className="h-12"
            />
            <img
              src="/images/logo-pemkot.png"
              alt="Logo Pemkot"
              className="h-12"
            />
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold leading-snug">
            UPT PENGUJIAN KENDARAAN BERMOTOR
            <br />
            DINAS PERHUBUNGAN KOTA YOGYAKARTA
          </h2>
        </div>

        {/* Kanan: Info kontak */}
        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="flex items-start gap-2">
            <MapPin className="w-5 h-5" />
            Office : Jl. Lingkar Selatan Umbulharjo, Yogyakarta 55163
          </p>
          <p className="flex items-start gap-2">
            <Mail className="w-5 h-5" />
            perhubungan@jogjakota.go.id
          </p>
          <p className="flex items-start gap-2">
            <Phone className="w-5 h-5" />
            0858-7777-9520
          </p>
        </div>
      </div>

      {/* Garis dan copyright */}
      <div className="bg-[#120378] text-white text-sm text-center py-5">
        {/* Ikon sosial media */}
        <div className="flex gap-4 my-4 justify-center md:justify-end md:mr-12">
          <a href="#" className="hover:text-gray-300">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <Linkedin size={20} />
          </a>
        </div>

        {/* Garis responsif */}
        <div className="w-full max-w-6xl border-t-2 border-[#F3C623] mx-auto mb-2" />

        <p>Hak Cipta 2025 UPT PKB Dishub Kota Yogyakarta</p>
      </div>
    </footer>
  );
};

export default Footer;
