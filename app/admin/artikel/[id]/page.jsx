"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SpinnerLoader from "../../../Components/SpinnerLoader";

export default function DetailArtikel() {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikelById = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8000/api/artikel/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const response = await res.json();
        setArtikel(response.data || response);
      } catch (error) {
        console.error("Error ambil detail artikel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikelById();
  }, [id]);

  // Gunakan spinner loader saat loading
  if (loading) return <SpinnerLoader />;
  if (!artikel) return <p>Artikel tidak ditemukan.</p>;

  return (
    <div className="mx-auto mt-12">
      {/* Tombol back di luar container */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-red-500 cursor-pointer mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Kembali
      </button>

      {/* Container detail artikel */}
      <div className="px-6 py-4 bg-white rounded-lg shadow-lg text-gray-700">
        {/* Judul */}
        <h2 className="text-3xl font-bold mb-4">{artikel.judul}</h2>

        {/* Tanggal & Penulis */}
        <p className="text-blue-500 mb-2">
          Dipublikasikan pada:{" "}
          {new Date(artikel.tanggal_publish).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-600 mb-4">
          Penulis: {artikel.user?.name || "-"}
        </p>

        {/* Gambar artikel */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {artikel.gambar.map((img, index) => (
            <div
              key={index}
              className="flex justify-center items-center overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={img}
                alt={`Gambar ${index + 1}`}
                className="object-contain max-h-80 w-auto mx-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Isi artikel */}
        <div
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: artikel.isi }}
        />
      </div>
    </div>
  );
}
