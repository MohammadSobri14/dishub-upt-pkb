"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaSearch,
  FaSort,
} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "../../Components/Pagination"; // Pastikan path sesuai

export default function ArtikelTabel() {
  const [artikels, setArtikels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const router = useRouter();

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
      const data = response.data || response;

      setArtikels(data);
      setFiltered(data);
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
      if (!token) return alert("Token tidak ditemukan");

      const res = await fetch(`http://localhost:8000/api/artikel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error("Gagal menghapus artikel");
      }

      const updated = artikels.filter((item) => item.id !== id);
      setArtikels(updated);
      setFiltered(updated);
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus artikel");
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchQuery(keyword);

    const filteredData = artikels.filter((item) =>
      item.judul.toLowerCase().includes(keyword)
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.tanggal_publish);
      const dateB = new Date(b.tanggal_publish);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFiltered(sorted);
  };

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchArtikel();
  }, []);

  // Fungsi filter tanggal
  const handleDateFilter = () => {
    let filteredData = [...artikels];

    if (startDate) {
      filteredData = filteredData.filter(
        (item) => new Date(item.tanggal_publish) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredData = filteredData.filter(
        (item) => new Date(item.tanggal_publish) <= new Date(endDate)
      );
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  };

  // Filter otomatis ketika startDate atau endDate berubah
  useEffect(() => {
    let filteredData = [...artikels];

    if (startDate) {
      filteredData = filteredData.filter(
        (item) => new Date(item.tanggal_publish) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredData = filteredData.filter(
        (item) => new Date(item.tanggal_publish) <= new Date(endDate)
      );
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [startDate, endDate, artikels]);

  // Fungsi reset filter
  const handleResetFilters = () => {
    setSearchQuery("");
    setSortOrder("desc");
    setStartDate("");
    setEndDate("");
    setFiltered(artikels);
    setCurrentPage(1);
  };

  return (
    <div className="px-6 py-2 my-12 bg-white shadow rounded text-gray-700">
      {/* Header & Toolbar */}
      {/* Header & Toolbar */}
      <div className="my-2">
        <h2 className="text-2xl font-bold text-[#341B6E] my-5">
          Kelola Artikel
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Bagian Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Judul..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-48 sm:w-60 border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-[#341B6E] focus:border-[#341B6E]"
              />
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-lg focus:ring-2 focus:ring-[#341B6E] focus:border-[#341B6E] hover:cursor-pointer"
              />
              <span>-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded-lg focus:ring-2 focus:ring-[#341B6E] focus:border-[#341B6E] hover:cursor-pointer"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <FaSort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={sortOrder}
                onChange={handleSort}
                className="w-40 border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-[#341B6E] focus:border-[#341B6E] appearance-none hover:cursor-pointer"
              >
                <option value="desc">⬆️ Terbaru</option>
                <option value="asc">⬇️ Terlama</option>
              </select>
            </div>
          </div>

          {/* Bagian Tombol Actions */}
          <div className="flex items-center gap-2">
            {/* Reset Filter */}
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-1.5 bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 cursor-pointer active:scale-95 transition-transform shadow-sm"
            >
              <GrPowerReset className="text-xs" />
              {"Reset Filter"}
            </button>
            {/* Tambah Artikel */}
            <button
              onClick={() => router.push("/admin/artikel/tambah")}
              className="inline-flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 cursor-pointer active:scale-95 transition-transform shadow-sm"
            >
              <FaPlus className="text-xs" /> Tambah Artikel
            </button>
          </div>
        </div>
      </div>
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="text-4xs uppercase bg-[#341B6E] text-white border-b border-[#ccc]">
                <tr>
                  <th className="py-3 px-4 text-center">No</th>
                  <th className="py-3 px-4 text-left">Judul</th>
                  <th className="py-3 px-4 text-left">Tanggal Publish</th>
                  <th className="py-3 px-4 text-left">Penulis</th>
                  <th className="py-3 px-4 text-left">Isi</th>
                  <th className="py-3 px-4 text-left">Gambar</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  // Skeleton loading: 5 rows
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-200 odd:bg-white even:bg-gray-100"
                      >
                        {[...Array(7)].map((__, idx) => (
                          <td key={idx} className="py-3 px-4 text-center">
                            <div className="h-4 bg-gray-300 rounded animate-pulse max-w-[80px] mx-auto"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-gray-500 font-medium"
                    >
                      Tidak ada artikel yang tersedia.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 transition duration-200 border-b border-gray-200 odd:bg-white even:bg-gray-100"
                    >
                      <td className="py-3 px-4 text-center text-sm text-gray-700">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {item.judul}
                      </td>
                      <td className="py-3 px-4 text-sm">
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
                      <td className="py-3 px-4 text-sm">
                        {item.user?.name || "-"}
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-sm text-gray-600">
                        {item.isi}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.gambar && item.gambar.length > 0 ? (
                          <img
                            src={`http://localhost:8000/storage/${item.gambar[0]}`}
                            alt="gambar artikel"
                            className="h-16 w-16 object-cover rounded"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-3 text-lg">
                          <Link
                            href={`/admin/artikel/${item.id}`}
                            className="text-blue-600 hover:rounded"
                            title="Lihat"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            href={`/admin/artikel/edit/${item.id}`}
                            className="text-yellow-500 hover:rounded"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:rounded cursor-pointer"
                            title="Hapus"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filtered.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filtered.length}
            />
          )}
        </>
    </div>
  );
}
