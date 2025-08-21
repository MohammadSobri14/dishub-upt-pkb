"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/1.jpg", alt: "Kegiatan 1" },
  { src: "/images/2.jpg", alt: "Kegiatan 2" },
  { src: "/images/3.jpg", alt: "Kegiatan 3" },
  { src: "/images/4.jpg", alt: "Kegiatan 4" },
  { src: "/images/drive-thru.jpg", alt: "Kegiatan 5" },
  { src: "/images/1.jpg", alt: "Kegiatan 6" },
  { src: "/images/2.jpg", alt: "Kegiatan 7" },
  { src: "/images/3.jpg", alt: "Kegiatan 8" },
  { src: "/images/4.jpg", alt: "Kegiatan 9" },
  { src: "/images/drive-thru.jpg", alt: "Kegiatan 10" },
  { src: "/images/1.jpg", alt: "Kegiatan 11" },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);

  // atur jumlah gambar sesuai ukuran layar
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

  const maxIndex = images.length - visibleImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section
      className="relative px-4 pt-17 pb-34 text-center bg-white overflow-x-hidden"
      style={{ backgroundImage: "url('/images/bg-batik.png')" }}
    >
      <h2 className="text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
        Gallery
      </h2>
      <p className="max-w-3xl p-4 mx-auto mb-8 text-gray-600">
        Beberapa galeri foto ditampilkan untuk mendokumentasikan setiap kegiatan
        dan aktivitas yang telah dilaksanakan oleh UPT Pengujian Kendaraan
        Bermotor Dinas Perhubungan Kota Yogyakarta.
      </p>

      {/* Carousel container */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
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

export default Gallery;
