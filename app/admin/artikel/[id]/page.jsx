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
        {artikel.gambar?.length > 0 && (
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artikel.gambar.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gambar ${index + 1}`}
                className="rounded shadow-md max-h-80 object-cover w-full"
              />
            ))}
          </div>
        )}

        {/* Isi artikel */}
        <div
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: artikel.isi }}
        />
      </div>
    </div>
  );
}
