"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetailArtikel() {
  const { id } = useParams(); // Ambil ID dari URL
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
        setArtikel(response.data || response); // tergantung dari bentuk API-mu
      } catch (error) {
        console.error("Error ambil detail artikel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikelById();
  }, [id]);

  if (loading) return <p>Memuat detail artikel...</p>;
  if (!artikel) return <p>Artikel tidak ditemukan.</p>;

  return (
    <div className="p-6 bg-white shadow rounded text-gray-700 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{artikel.judul}</h2>
      <p className="text-gray-600 mb-2">
        Dipublikasikan pada:{" "}
        {new Date(artikel.tanggal_publish).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="text-gray-600 mb-4">Penulis: {artikel.user?.name || "-"}</p>

      {artikel.gambar && artikel.gambar.length > 0 && (
        <div className="mb-4">
          <img
            src={`http://localhost:8000/storage/${artikel.gambar[0]}`}
            alt="Gambar Artikel"
            className="rounded shadow-md max-h-80 object-cover"
          />
        </div>
      )}

      <div className="prose max-w-none">
        <p>{artikel.isi}</p>
      </div>
    </div>
  );
}
