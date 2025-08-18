"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Eye } from "lucide-react";
import SpinnerLoader from "../../Components/SpinnerLoader";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    if (!slug) return;

    const fetchBerita = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://127.0.0.1:8000/api/artikel?slug=${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          const artikel = data.data.find((a) => a.slug === slug);
          if (artikel) setBerita(artikel);
          else console.error("Artikel dengan slug ini tidak ditemukan");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [slug]);

  if (loading) return <SpinnerLoader />;
  if (!berita) return <p>Berita tidak ditemukan.</p>;

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
  };

  const nextImage = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % berita.gambar.length,
    }));
  };

  const prevImage = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + berita.gambar.length) % berita.gambar.length,
    }));
  };

  return (
    <div className="mx-auto my-12 px-7">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-red-500 cursor-pointer mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Kembali
      </button>

      <div className="px-6 py-4 bg-white rounded-lg shadow-2xl text-gray-700">
        <h2 className="text-3xl font-bold mb-4">{berita.judul}</h2>
        <p className="text-blue-500 mb-2">
          Dipublikasikan pada:{" "}
          {new Date(berita.tanggal_publish).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {berita.gambar && berita.gambar.length > 0 && (
          <div
            className={`mb-6 grid gap-6 ${
              berita.gambar.length === 1
                ? "grid-cols-1"
                : berita.gambar.length === 2
                ? "grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {berita.gambar.map((img, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow w-full ${
                  berita.gambar.length === 1 ? "h-96" : "h-64"
                } flex items-center justify-center cursor-pointer`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img}
                  alt={`Gambar ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: berita.isi }} />
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <button
            className="absolute top-5 right-5 text-white text-3xl hover:text-red-500 cursor-pointer"
            onClick={() => setLightbox({ open: false, index: 0 })}
          >
            <X />
          </button>

          <button
            className="absolute left-5 text-white text-4xl hover:text-gray-300 cursor-pointer"
            onClick={prevImage}
          >
            <ChevronLeft />
          </button>

          <img
            src={berita.gambar[lightbox.index]}
            alt={`Preview ${lightbox.index + 1}`}
            className="max-h-full max-w-full rounded-lg shadow-lg"
          />

          <button
            className="absolute right-5 text-white text-4xl hover:text-gray-300 cursor-pointer"
            onClick={nextImage}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
