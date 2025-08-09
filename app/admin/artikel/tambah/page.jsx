"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Editor from "../../../Components/Editor";

export default function TambahArtikel() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [tanggalPublish, setTanggalPublish] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [isi, setIsi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      judul,
      tanggal_publish: tanggalPublish,
      isi,
    };

    if (lokasi) body.lokasi = lokasi;

    console.log("Data yang dikirim:", body);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/artikel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${errorText}`);
      }

      router.push("/admin/artikel");
    } catch (error) {
      console.error("Gagal menyimpan artikel:", error);
      alert("Gagal menyimpan artikel, coba lagi.");
    }
  };


  const handleBack = () => {
    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-8 my-12 bg-white rounded-lg shadow-lg text-black space-y-6 overflow-auto"
    >
      {/* Header dengan arrow back */}
      <div className="flex items-center gap-3 mb-7">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Kembali"
        >
          <FaArrowLeft className="text-[#341B6E] text-lg hover:cursor-pointer hover:text-red-500" />
        </button>
        <h2 className="text-2xl font-bold text-[#341B6E]">
          Tambah Berita Baru
        </h2>
      </div>

      {/* Tanggal Publish dan Judul Sejajar */}
      <div className="flex gap-6">
        {/* Input Judul dengan lebar lebih besar */}
        <div className="flex flex-col flex-[3]">
          <label htmlFor="judul" className="mb-2 font-semibold text-[#341B6E]">
            Judul Berita
          </label>
          <input
            id="judul"
            type="text"
            placeholder="Masukkan judul berita"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        {/* Input Tanggal Publish dengan lebar lebih kecil */}
        <div className="flex flex-col flex-[1]">
          <label
            htmlFor="tanggalPublish"
            className="mb-2 font-semibold text-[#341B6E]"
          >
            Tanggal Publish
          </label>
          <input
            id="tanggalPublish"
            type="date"
            value={tanggalPublish}
            onChange={(e) => setTanggalPublish(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Editor Isi Artikel */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-[#341B6E]">Isi Berita</label>
        <Editor content={isi} onChange={setIsi} />
      </div>

      {/* Tombol Upload dan Cancel */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-6 py-2 rounded-md font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-6 py-2 rounded-md font-semibold transition-colors"
        >
          Upload
        </button>
      </div>
    </form>
  );
}
