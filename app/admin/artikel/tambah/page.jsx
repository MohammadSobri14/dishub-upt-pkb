"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahArtikel() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artikel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, konten }),
    });
    router.push("/admin/artikel");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Tambah Artikel</h2>
      <input
        placeholder="Judul"
        className="block w-full p-2 border mb-2"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />
      <textarea
        placeholder="Konten"
        className="block w-full p-2 border mb-4"
        value={konten}
        onChange={(e) => setKonten(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}
