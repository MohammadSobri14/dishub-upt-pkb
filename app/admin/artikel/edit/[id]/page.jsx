"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function EditArtikel() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    tanggal_publish: "",
    lokasi: "",
    gambar: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8000/api/artikel/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        setFormData({
          judul: data.data.judul,
          isi: data.data.isi,
          tanggal_publish: data.data.tanggal_publish,
          lokasi: data.data.lokasi,
          gambar: data.data.gambar || [],
        });
      } catch (err) {
        console.error("Gagal ambil artikel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8000/api/artikel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text(); // 🔍 tampilkan isi error dari Laravel
        console.error("Server response:", errorText);
        throw new Error("Gagal update artikel");
      }

      alert("Artikel berhasil diperbarui");
      router.push("/admin/artikel");
    } catch (err) {
      alert("Gagal menyimpan perubahan.");
      console.error(err);
    }
  };

  if (loading) return <p>Memuat...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-gray-700 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Artikel</h2>
      {/* Tombol Kembali */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 flex items-center text-sm text-blue-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Kembali
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Judul</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Isi</label>
          <textarea
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            className="w-full border rounded p-2 h-32"
          />
        </div>

        <div>
          <label className="block font-medium">Tanggal Publish</label>
          <input
            type="date"
            name="tanggal_publish"
            value={formData.tanggal_publish}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Optional: tampilkan gambar sebelumnya */}
        {formData.gambar.length > 0 && (
          <div>
            <label className="block font-medium">Gambar Saat Ini:</label>
            <img
              src={`http://localhost:8000/storage/${formData.gambar[0]}`}
              alt="gambar"
              className="h-32 w-32 object-cover mt-2 rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
