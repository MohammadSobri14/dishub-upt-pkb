"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaTimes, FaUpload } from "react-icons/fa"; // tambahkan FaUpload
import Editor from "../../../Components/Editor";
import SuccessToast from "../../../Components/SuccessToast";
import ErrorToast from "../../../Components/ErrorToast";
import LoadingOverlay from "../../../Components/LoadingOverlay";

export default function TambahArtikel() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [tanggalPublish, setTanggalPublish] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [isi, setIsi] = useState("");
  const [gambarFiles, setGambarFiles] = useState([]);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGambarChange = (e) => {
    const files = Array.from(e.target.files);
    setGambarFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveGambar = (index) => {
    setGambarFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!judul || !tanggalPublish || !isi) {
      setErrorMessage("Judul, tanggal publish, dan isi wajib diisi.");
      setErrorToastOpen(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tanggal_publish", tanggalPublish);
    formData.append("isi", isi);
    if (lokasi) formData.append("lokasi", lokasi);
    gambarFiles.forEach((file) => {
      formData.append("gambar[]", file);
    });

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/artikel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Server error");
      }

      setSuccessToastOpen(true);
      setJudul("");
      setTanggalPublish("");
      setLokasi("");
      setIsi("");
      setGambarFiles([]);

      setTimeout(() => router.push("/admin/artikel"), 1500);
    } catch (error) {
      setErrorMessage(error.message || "Gagal menyimpan artikel.");
      setErrorToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <SuccessToast
        isOpen={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Berita berhasil dibuat!"
      />
      <ErrorToast
        isOpen={errorToastOpen}
        onClose={() => setErrorToastOpen(false)}
        message={errorMessage}
      />

      <form
        onSubmit={handleSubmit}
        className="mx-auto p-8 my-12 bg-white rounded-lg shadow-lg text-black space-y-6 overflow-auto max-w-4xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Kembali"
            className="text-[#341B6E] text-lg hover:cursor-pointer hover:text-red-500"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold text-[#341B6E]">
            Tambah Berita Baru
          </h2>
        </div>

        {/* Judul dan Tanggal */}
        <div className="flex gap-6">
          <div className="flex flex-col flex-[3]">
            <label
              htmlFor="judul"
              className="mb-2 font-semibold text-[#341B6E]"
            >
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
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition hover:cursor-pointer"
            />
          </div>
        </div>

        {/* Isi Artikel */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#341B6E]">
            Isi Berita
          </label>
          <Editor content={isi} onChange={setIsi} />
        </div>

        {/* Upload Gambar dengan icon */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#341B6E]">
            Upload Gambar
          </label>

          <label
            htmlFor="gambar-upload"
            className="flex items-center gap-2 rounded-md"
          >
            <span className="flex items-center border bg-[#341B6E] rounded px-3 py-2 text-white gap-2 hover:cursor-pointer">
              <FaUpload className="fill-current" />
              Pilih Gambar
            </span>
          </label>

          <input
            id="gambar-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGambarChange}
            className="hidden"
          />

          {/* Preview gambar */}
          {gambarFiles.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {gambarFiles.map((file, index) => {
                const objectUrl = URL.createObjectURL(file);
                return (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded overflow-hidden border border-gray-300"
                  >
                    <img
                      src={objectUrl}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                      onLoad={() => URL.revokeObjectURL(objectUrl)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGambar(index)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded-full p-1 text-xs flex items-center justify-center"
                      aria-label="Hapus gambar"
                    >
                      <FaTimes />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tombol */}
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
    </>
  );
}
