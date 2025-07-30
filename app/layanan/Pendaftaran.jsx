"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Pendaftaran = () => {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg-siregol.png')",
      }}
    >
      <div className="max-w-3xl w-full rounded-2xl p-6 md:p-10 flex flex-col items-center text-center space-y-8">
        {/* Judul */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 border-b-4 border-[#F3C623] inline-block pb-1">
          Pendaftaran Online
        </h2>

        {/* Gambar */}
        <div className="w-full rounded-xl overflow-hidden border-4 border-white shadow-md">
          <Image
            src="/images/pendaftaran-online.png"
            alt="Pendaftaran Online"
            width={700}
            height={450}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* CTA */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://play.google.com/store/apps/details?id=id.go.jogjakota.jogjasmartservice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-105 transition-transform"
          >
            <Image
              src="/images/playstore.png"
              alt="Get it on Google Play"
              width={180}
              height={60}
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
              width={180}
              height={60}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pendaftaran;
