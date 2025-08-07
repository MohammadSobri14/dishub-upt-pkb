"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Link from "next/link";

export default function ArtikelTabel() {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtikel = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token tidak ditemukan");

      const res = await fetch("http://localhost:8000/api/artikel", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Respon error:", res.status, errorText);
        throw new Error("Gagal mengambil data artikel");
      }

      const response = await res.json();
      setArtikels(response.data || response);
    } catch (error) {
      console.error("Gagal fetch artikel:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus artikel ini?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan, tidak bisa menghapus.");
        return;
      }

      const res = await fetch(`http://localhost:8000/api/artikel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Delete error:", errText);
        throw new Error("Gagal menghapus artikel");
      }

      setArtikels((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus artikel");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded text-gray-700">
      <h2 className="text-2xl font-bold mb-6">Daftar Artikel</h2>

      {loading ? (
        <p>Memuat data...</p>
      ) : artikels.length === 0 ? (
        <p>Tidak ada artikel yang tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-center">No</th>
                <th className="py-3 px-4 border-b text-left">Judul</th>
                <th className="py-3 px-4 border-b text-left">
                  Tanggal Publish
                </th>
                <th className="py-3 px-4 border-b text-left">Penulis</th>
                <th className="py-3 px-4 border-b text-left">Isi</th>
                <th className="py-3 px-4 border-b text-left">Gambar</th>
                <th className="py-3 px-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {artikels.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b font-medium text-gray-800">
                    {item.judul}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.tanggal_publish
                      ? new Date(item.tanggal_publish).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {item.user?.name || "-"}
                  </td>
                  <td className="py-3 px-4 border-b max-w-xs truncate">
                    {item.isi}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.gambar && item.gambar.length > 0 ? (
                      <img
                        src={`http://localhost:8000/storage/${item.gambar[0]}`}
                        alt="gambar artikel"
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/artikel/${item.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="Lihat"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/admin/artikel/edit/${item.id}`}
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
