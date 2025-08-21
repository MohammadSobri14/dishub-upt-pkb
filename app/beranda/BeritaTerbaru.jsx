"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { FaImage } from "react-icons/fa";

// fungsi format tanggal -> dd MMMM yyyy (Indonesia)
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

// hapus tag HTML dari deskripsi
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

export default function BeritaTerbaru() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/artikel", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (data.success) {
          setBeritaList(data.data);
        } else {
          console.error("Gagal ambil artikel:", data.message);
        }
      } catch (err) {
        console.error("Error fetch artikel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < beritaList.length - visibleCards) setIndex(index + 1);
  };

  return (
    <section
      className="px-6 pt-6 min-h-[600px] scroll-mt-25 text-center bg-white"
      style={{ backgroundImage: "url('/images/bg-batik.png')" }}
    >
      <h2 className="text-4xl font-bold text-[#341B6E] mb-2 border-b-4 border-[#F3C623] inline-block">
        Berita Terbaru
      </h2>
      <p className="max-w-3xl mx-auto mt-3 text-gray-600">
        Berita terbaru seputar kegiatan dan aktivitas UPT Pengujian Kendaraan
        Bermotor Dinas Perhubungan Kota Yogyakarta, serta informasi terkait
        pengujian kendaraan.
      </p>

      {loading ? (
        <p className="mt-10 text-gray-500">Loading berita...</p>
      ) : beritaList.length === 0 ? (
        <p className="mt-10 text-gray-500">Belum ada berita.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3">
          {beritaList.slice(index, index + visibleCards).map((item, i) => (
            <div
              key={item.id || i}
              className="relative overflow-hidden transition duration-300 bg-white border shadow-md rounded-2xl hover:shadow-xl group"
            >
              <div className="relative w-full h-[200px] bg-gray-100 rounded-t-2xl overflow-hidden">
                {item.gambar?.[0] ? (
                  <Image
                    src={item.gambar[0]}
                    alt={item.judul}
                    width={400}
                    height={200}
                    className="w-full h-[200px] object-cover rounded-t-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}

                {/* fallback kalau gambar kosong/ error */}
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-100">
                  <FaImage className="text-gray-400 text-6xl" />
                </div>

                {/* Overlay Hover */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-opacity-0 cursor-pointer backdrop-blur-0 group-hover:bg-opacity-30 group-hover:backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
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
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.tanggal_publish)}
                  </span>
                  <span>{item.timeAgo || ""}</span>
                </div>
                <h3 className="font-semibold mt-1 text-md text-[#341B6E] line-clamp-2">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {stripHtml(item.isi)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tombol "Berita Lainnya" */}
      <div className="mt-5">
        <Link href="/berita">
          <span className="inline-block px-6 py-3 text-white bg-[#341B6E] hover:bg-[#4A2E91] transition-colors duration-300 rounded-full shadow-md">
            Berita Lainnya
          </span>
        </Link>
      </div>
    </section>
  );
}
