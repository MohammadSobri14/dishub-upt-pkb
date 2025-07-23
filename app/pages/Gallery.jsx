"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/images/1.jpg", alt: "Kegiatan 1" },
  { src: "/images/2.jpg", alt: "Kegiatan 2" },
  { src: "/images/drive-thru.jpg", alt: "Kegiatan 3" },
  { src: "/images/3.jpg", alt: "Kegiatan 4" },
  { src: "/images/4.jpg", alt: "Kegiatan 5" },
  { src: "/images/1.jpg", alt: "Kegiatan 5" },
  { src: "/images/2.jpg", alt: "Kegiatan 5" },
  { src: "/images/3.jpg", alt: "Kegiatan 5" },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageWidth = 312;
  const totalImages = images.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative px-4 py-12 text-center bg-white bottom-14">
      <h2 className="text-4xl font-bold text-[#341B6E] mb-6 border-b-4 border-[#F3C623] inline-block">
        Gallery
      </h2>
      <p className="max-w-3xl p-4 mx-auto mb-8 text-gray-600">
        Beberapa galeri foto ditampilkan untuk mendokumentasikan setiap kegiatan
        dan aktivitas yang telah dilaksanakan oleh UPT Pengujian Kendaraan
        Bermotor Dinas Perhubungan Kota Yogyakarta.
      </p>

      {/* Tombol Panah */}
      <button
        onClick={prevSlide}
        className="absolute left-28 top-[70%] text-[#341B6E] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 cursor-pointer"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-28 top-[70%] text-[#341B6E] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 cursor-pointer"
      >
        <ChevronRight />
      </button>

      {/* Carousel */}
      <div className="overflow-hidden mx-auto w-[1014px] border rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * imageWidth}px)`,
            width: `${imageWidth * totalImages}px`,
          }}
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className="min-w-[300px] mx-[6px] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
