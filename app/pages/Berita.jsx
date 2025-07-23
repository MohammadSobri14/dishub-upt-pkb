"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const beritaList = [
  {
    img: "/images/1.jpg",
    title: "Hasil operasi yang dilakukan oleh team dinas berhasil...",
    date: "20 Juni 2023",
    timeAgo: "2 hari yang lalu",
  },
  {
    img: "/images/2.jpg",
    title: "Hasil operasi yang dilakukan oleh team dinas berhasil...",
    date: "20 Juni 2023",
    timeAgo: "2 hari yang lalu",
  },
  {
    img: "/images/3.jpg",
    title: "Hasil operasi yang dilakukan oleh team dinas berhasil...",
    date: "20 Juni 2023",
    timeAgo: "2 hari yang lalu",
  },
  {
    img: "/images/4.jpg",
    title: "Hasil operasi yang dilakukan oleh team dinas berhasil...",
    date: "20 Juni 2023",
    timeAgo: "2 hari yang lalu",
  },
  {
    img: "/images/drive-thru.jpg",
    title: "Hasil operasi yang dilakukan oleh team dinas berhasil...",
    date: "20 Juni 2023",
    timeAgo: "2 hari yang lalu",
  },
];

export default function Berita() {
  const [index, setIndex] = useState(0);
  const visibleCards = 3;
  const maxIndex = beritaList.length - visibleCards;

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  return (
    <section id="berita" className="p-2 px-6 my-0 text-center bg-white">
      <h2 className="text-4xl font-bold text-[#341B6E] mb-2 border-b-4 border-[#F3C623] inline-block">
        Berita Terbaru
      </h2>
      <p className="max-w-3xl mx-auto mt-3 text-gray-600">
        Berita terbaru seputar kegiatan dan aktivitas UPT Pengujian Kendaraan
        Bermotor Dinas Perhubungan Kota Yogyakarta, serta informasi terkait
        pengujian kendaraan, akan ditampilkan di sini.
      </p>

      {/* Slide container tanpa animasi */}
      <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3">
        {beritaList.slice(index, index + visibleCards).map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden transition duration-300 bg-white border shadow-md rounded-2xl hover:shadow-xl group"
          >
            <div className="relative">
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-[200px] object-cover rounded-t-2xl"
              />

              {/* Overlay + Icon View saat Hover */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-opacity-0 cursor-pointer backdrop-blur-0 group-hover:bg-opacity-30 group-hover:backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>Lihat</span>
                </div>
              </div>
            </div>

            <div className="p-4 text-left">
              <div className="flex items-center justify-between text-sm text-gray-500 justi">
                <span className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </span>
                <span>{item.timeAgo}</span>
              </div>
              <h3 className="font-semibold mt-1 text-md text-[#341B6E] line-clamp-2">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigasi & Button */}
      <div className="flex items-center justify-between px-2 py-2 mt-4">
        {/* Berita Lain */}
        <a
          href="#"
          className="px-4 py-2 border text-sm font-medium text-[#4a2b8f] border-[#4a2b8f] rounded-lg hover:bg-gray-100"
        >
          Berita Lain
        </a>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className={`p-2 border rounded-full ${
              index === 0
                ? "cursor-not-allowed text-gray-300 border-gray-200"
                : "hover:bg-gray-100 text-[#341B6E] border cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={index >= maxIndex}
            className={`p-2 border rounded-full ${
              index >= maxIndex
                ? "cursor-not-allowed text-gray-300 border-gray-200"
                : "hover:bg-gray-100 text-[#341B6E] border cursor-pointer"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
