"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaTimes, FaUpload } from "react-icons/fa";
import Editor from "../../../Components/Editor";
import SuccessToast from "../../../Components/SuccessToast";
import ErrorToast from "../../../Components/ErrorToast";
import LoadingOverlay from "../../../Components/LoadingOverlay";
import SpinnerLoader from "../../../Components/SpinnerLoader";

export default function FormArtikel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [judul, setJudul] = useState("");
  const [tanggalPublish, setTanggalPublish] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [isi, setIsi] = useState("");
  const [gambarFiles, setGambarFiles] = useState([]);
  const [gambarLama, setGambarLama] = useState([]);

  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil data saat edit
  useEffect(() => {
    if (id) {
      setLoading(true);
      const token = localStorage.getItem("token");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artikel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const artikel = data.data || data;
          setJudul(artikel.judul || "");
          setTanggalPublish(
            artikel.tanggal_publish ? artikel.tanggal_publish.slice(0, 10) : ""
          );
          setLokasi(artikel.lokasi || "");
          setIsi(artikel.isi || artikel.content || "");
          setGambarLama(
            Array.isArray(artikel.gambar)
              ? artikel.gambar.map((g) =>
                  g.startsWith("http")
                    ? g
                    : `${process.env.NEXT_PUBLIC_API_URL}/storage/${g}`
                )
              : []
          );
        })
        .catch(() => {
          setErrorMessage("Gagal memuat data artikel.");
          setErrorToastOpen(true);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Tampilkan spinner loader saat loading fetch data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <SpinnerLoader />
      </div>
    );
  }

  const handleGambarChange = (e) => {
    const files = Array.from(e.target.files);
    const totalGambar = gambarLama.length + gambarFiles.length;
    const sisaSlot = 5 - totalGambar;
    if (sisaSlot <= 0) {
      setErrorMessage("Maksimal 5 gambar per artikel.");
      setErrorToastOpen(true);
      return;
    }
    const filesToAdd = files.slice(0, sisaSlot);
    setGambarFiles((prev) => [...prev, ...filesToAdd]);
    if (files.length > sisaSlot) {
      setErrorMessage("Maksimal 5 gambar per artikel.");
      setErrorToastOpen(true);
    }
  };

  const handleRemoveGambar = (index) => {
    setGambarFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveGambarLama = (index) => {
    setGambarLama((prev) => prev.filter((_, i) => i !== index));
  };

  const stripHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
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

    if (id) {
      formData.append("_method", "PUT");
      formData.append("gambar_lama", JSON.stringify(gambarLama)); // kirim array gambar lama yang masih dipertahankan
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/artikel${id ? `/${id}` : ""}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Server error");
      }

      setSuccessToastOpen(true);
      setTimeout(() => router.push("/admin/artikel"), 1500);
    } catch (error) {
      setErrorMessage(error.message || "Gagal menyimpan artikel.");
      setErrorToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => router.back();

  return (
    <>
      {loading && <LoadingOverlay />}
      <SuccessToast
        isOpen={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message={id ? "Berita berhasil diperbarui!" : "Berita berhasil dibuat!"}
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
            {id ? "Edit Berita" : "Tambah Berita Baru"}
          </h2>
        </div>

        {/* Judul & Tanggal */}
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
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer"
            />
          </div>
        </div>

        {/* Isi */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#341B6E]">
            Isi Berita
          </label>
          <Editor content={isi} onChange={setIsi} />
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#341B6E]">
            Upload Gambar
          </label>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">
              {`Total Gambar (Max 5) : ${
                gambarLama.length + gambarFiles.length
              } / 5`}
            </span>
          </div>
          <label
            htmlFor="gambar-upload"
            className={`flex items-center gap-2 rounded-md`}
          >
            <span
              className={`flex items-center border rounded px-3 py-2 gap-2 transition-colors ${
                gambarLama.length + gambarFiles.length >= 5
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#341B6E] text-white hover:cursor-pointer"
              }`}
            >
              <FaUpload /> Pilih Gambar
            </span>
          </label>
          <input
            id="gambar-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGambarChange}
            className="disabled:cursor-not-allowed hidden"
            disabled={gambarLama.length + gambarFiles.length >= 5}
          />

          {/* Gambar Lama */}
          {gambarLama.length > 0 && (
            <>
              <span className="text-xs text-gray-500 mb-1 mt-1">
                Gambar Lama :
              </span>
              <div className="mt-1 flex flex-row flex-wrap gap-4 ">
                {gambarLama.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded overflow-hidden border border-gray-300"
                  >
                    <img
                      src={src}
                      alt={`Gambar lama ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGambarLama(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:cursor-pointer"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gambar Baru */}
          {gambarFiles.length > 0 && (
            <>
              <span className="text-xs text-gray-500 mb-1 mt-2">
                Gambar Baru :
              </span>
              <div className="mt-1 flex flex-row flex-wrap gap-4">
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
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:cursor-pointer"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
          >
            {id ? "Update" : "Upload"}
          </button>
        </div>
      </form>
    </>
  );
}
