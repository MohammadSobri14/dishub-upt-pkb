"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const textOptions = [
  "Dinas Perhubungan Kota Yogyakarta",
  "UPT Pengujian Kendaraan Bermotor",
];

const TYPING_SPEED = 70; // ms per karakter
const PAUSE_DURATION = 2000; // jeda sebelum menghapus
const DELETE_SPEED = 40; // kecepatan menghapus huruf

const Beranda = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = textOptions[currentIndex];

    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, DELETE_SPEED);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => fullText.slice(0, prev.length + 1));
      }, TYPING_SPEED);
    }

    // Setelah selesai ketik, tunggu lalu hapus
    if (!isDeleting && displayText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    }

    // Setelah selesai hapus, ganti ke teks berikutnya
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % textOptions.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section
      id="beranda"
      className="scroll-mt-24 w-full min-h-[633px] bg-cover bg-center bg-no-repeat relative flex items-center justify-center px-4 md:px-10 py-8"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-blue-900 opacity-50" />

      {/* Konten */}
      <div className="relative top-13 z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-[1280px] gap-8">
        {/* Kiri: Teks utama */}
        <div className="flex flex-col items-start justify-between w-full h-auto space-y-6 mx-14 md:w-1/2">
          <div>
            <h1 className="text-3xl whitespace-nowrap md:text-[43px] font-bold font-poppins text-white md:text-left leading-snug">
              Selamat Datang di
              <br />
              <span
                className={`inline-block pr-1 transition-all duration-200 ${
                  displayText ? "border-r-2 border-white" : ""
                }`}
              >
                {displayText}
              </span>
            </h1>
          </div>

          {/* Deskripsi dan tombol */}
          <div className="space-y-10">
            <p className="text-lg font-normal leading-relaxed text-white whitespace-nowrap md:text-xl font-poppins md:text-left">
              Website Resmi Unit Pelakasana Teknis
              <br /> Pengujian Kendaraan Bermotor Dinas Perhubungan Kota
              Yogyakarta. <br /> Kami Siap Memberikan Pelayanan Terbaik Untuk
              Anda.
            </p>

            <div className="flex flex-col items-center gap-4 py-4 sm:flex-row md:items-start">
              <button className="px-5 py-3 bg-white border rounded-lg text-[#341B6E] font-semibold text-base font-poppins">
                Hubungi Kami
              </button>

              {/* <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-white rounded-full w-11 h-11">
                  <Image
                    src="/images/player.png"
                    alt="Play"
                    width={20}
                    height={20}
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="text-base font-normal leading-tight text-white font-poppins md:text-left">
                  Tonton video
                  <br />
                  pengantar profil kami
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Kanan: Gambar */}
        <div className="flex justify-center w-full md:w-1/2">
          <Image
            src="/images/logo-asik.png"
            alt="Hero"
            width={508}
            height={500}
            className="relative z-10 hidden bottom-15 top-object-contain right-15 md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Beranda;
