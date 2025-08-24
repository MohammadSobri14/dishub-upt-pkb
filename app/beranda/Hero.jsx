"use client";

import Image from "next/image";
import WhatsAppButton from "./Wa";

const Hero = () => {
  return (
    <section
      className="scroll-mt-24 w-full min-h-[653px] bg-cover bg-center bg-no-repeat relative flex items-center justify-center px-4 sm:px-6 md:px-10 py-8"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-blue-900 opacity-50" />

      {/* Konten */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center md:items-center justify-between w-full max-w-[1280px] gap-8">
        {/* Kiri: Teks utama */}
        <div className="flex flex-col mt-8 items-center md:items-start w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold font-poppins text-white leading-snug">
              Selamat Datang di
              <br />
              UPT Pengujian Kendaraan Bermotor
              <br />
              Dinas Perhubungan Kota Yogyakarta
            </h1>
          </div>

          {/* Deskripsi + tombol */}
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white font-poppins">
              Website Resmi Unit Pelakasana Teknis
              <br className="hidden sm:block" />
              Pengujian Kendaraan Bermotor Dinas Perhubungan Kota Yogyakarta.
              <br className="hidden sm:block" />
              Kami Siap Memberikan Pelayanan Terbaik Untuk Anda.
            </p>

            <div className="flex flex-col ml-8 mt-7 sm:flex-row items-center md:items-start gap-4">
              {/* Tombol WhatsApp */}
              <WhatsAppButton
                href="https://wa.me/628xxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-600 transition-all
                 sm:px-6 sm:py-3 
                 md:px-4 md:py-2 md:text-sm
                 lg:px-6 lg:py-3 lg:text-base"
              />

              {/* CTA */}
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                <a
                  href="https://play.google.com/store/apps/details?id=id.go.jogjakota.jogjasmartservice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-105 transition-transform"
                >
                  <Image
                    src="/images/playstore.png"
                    alt="Get it on Google Play"
                    width={140}
                    height={40}
                    className="w-[120px] sm:w-[140px] md:w-[150px]"
                  />
                </a>

                <a
                  href="https://apps.apple.com/id/app/jogja-smart-service/id1568409193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-105 transition-transform"
                >
                  <Image
                    src="/images/appstore.png"
                    alt="Download on the App Store"
                    width={140}
                    height={40}
                    className="w-[120px] sm:w-[140px] md:w-[150px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: Gambar */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <Image
            src="/images/logo-asik.png"
            alt="Hero"
            width={450}
            height={450}
            className="relative z-10 w-[220px] sm:w-[300px] md:w-[450px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
