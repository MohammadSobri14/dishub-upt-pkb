"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/laktasi.png", alt: "Fasilitas 1" },
  { src: "/images/tunggu2.png", alt: "Fasilitas 2" },
  { src: "/images/tunggu.png", alt: "Fasilitas 3" },
  { src: "/images/tunggu2.png", alt: "Fasilitas 4" },
];

const Fasilitas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);

  // Responsiveness: jumlah gambar yang tampil disesuaikan dengan ukuran layar
  useEffect(() => {
    const updateVisibleImages = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(1); // smartphone
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2); // tablet
      } else {
        setVisibleImages(3); // desktop
      }
    };

    updateVisibleImages();
    window.addEventListener("resize", updateVisibleImages);

    return () => window.removeEventListener("resize", updateVisibleImages);
  }, []);

  // Auto-slide
  const maxIndex = images.length - visibleImages;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="relative px-4 pt-16 pb-20 text-center bg-white overflow-x-hidden">
      {/* Judul */}
      <h2 className="text-2xl md:text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
        Fasilitas
      </h2>

      {/* Deskripsi */}
      <p className="max-w-3xl p-4 mx-auto mb-8 text-gray-600 text-sm md:text-base">
        Untuk mendukung kenyamanan pengguna layanan, UPT PKB Dinas Perhubungan
        Kota Yogyakarta menyediakan berbagai fasilitas fisik yang bersih, aman,
        dan ramah keluarga.
      </p>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${(100 / visibleImages) * images.length}%`,
            transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
          }}
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className="p-2"
              style={{ width: `${100 / images.length}%` }}
            >
              <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden rounded-xl shadow hover:shadow-lg transition">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fasilitas;
