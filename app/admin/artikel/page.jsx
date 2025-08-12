"use client";

import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaSearch,
  FaSort,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "../../Components/Pagination";
import ErrorToast from "../../Components/ErrorToast";
import DeleteModal from "../../Components/DeleteModal";
import SuccessToast from "../../Components/SuccessToast";

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
  const [openSort, setOpenSort] = useState(false);
  const router = useRouter();
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [successToastMessage, setSuccessToastMessage] = useState("");

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

      if (res.status === 401) {
        setErrorToastMessage("Session habis, silakan login ulang.");
        setErrorToastOpen(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        setErrorToastMessage("Gagal mengambil data artikel: " + errorText);
        setErrorToastOpen(true);
        throw new Error("Gagal mengambil data artikel");
      }

      const response = await res.json();
      const data = response.data || response;

      setArtikels(data);
      setFiltered(data);
    } catch (error) {
      setErrorToastMessage(error.message || "Terjadi kesalahan");
      setErrorToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/artikel/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorText = await res.text();
        setErrorToastMessage("Gagal menghapus artikel: " + errorText);
        setErrorToastOpen(true);
        return;
      }
      setArtikels((prev) => prev.filter((a) => a.id !== deleteId));
      setModalOpen(false);
      setDeleteId(null);
      setSuccessToastMessage("Artikel berhasil dihapus!");
      setSuccessToastOpen(true);
    } catch (error) {
      setErrorToastMessage("Gagal menghapus artikel: " + (error.message || ""));
      setErrorToastOpen(true);
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

  function truncateText(text, maxLength = 100) {
    if (!text) return "";
    // Hapus tag HTML untuk preview di tabel
    const plain = text.replace(/<[^>]+>/g, "");
    return plain.length > maxLength ? plain.slice(0, maxLength) + "..." : plain;
  }

  return (
    <div className="px-6 py-2 my-12 bg-white shadow rounded text-gray-700">
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
            <div className="relative w-33">
              <button
                type="button"
                onClick={() => setOpenSort((prev) => !prev)}
                className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg flex items-center justify-between focus:ring-2 focus:ring-[#341B6E] focus:border-[#341B6E] bg-white hover:cursor-pointer"
              >
                <FaSort className="absolute left-3 text-gray-400" />
                <span className="flex items-center gap-2">
                  {sortOrder === "desc" ? "Terbaru" : "Terlama"}
                  {sortOrder === "desc" ? <FaArrowUp /> : <FaArrowDown />}
                </span>
              </button>

              {openSort && (
                <div className="absolute top-full left-0 mt-1 w-full border border-gray-300 bg-white rounded-lg shadow-md z-10">
                  <div
                    onClick={() => {
                      handleSort({ target: { value: "desc" } });
                      setOpenSort(false);
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Terbaru
                    <FaArrowUp />
                  </div>
                  <div
                    onClick={() => {
                      handleSort({ target: { value: "asc" } });
                      setOpenSort(false);
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Terlama
                    <FaArrowDown />
                  </div>
                </div>
              )}
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
                <th className="py-3 px-4 text-center">Tanggal Publish</th>
                {/* <th className="py-3 px-4 text-left">Penulis</th> */}
                <th className="py-3 px-4 text-center">Isi</th>
                <th className="py-3 px-4 text-center">Gambar</th>
                <th className="py-3 px-4 text-center">Jumlah Gambar</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                // Skeleton loading: 5 rows
                Array(8)
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
                    <td className="py-3 text-sm w-42 text-center truncate whitespace-nowrap">
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
                    {/* <td className="py-3 px-4 text-sm">
                      {item.user?.name || "-"}
                    </td> */}
                    <td
                      className="py-3 px-4 max-w-xs text-sm text-gray-600"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "16rem",
                      }}
                      title={item.isi}
                    >
                      {truncateText(item.isi, 100)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {item.gambar && item.gambar.length > 0 ? (
                        <img
                          src={item.gambar[0]}
                          alt="gambar artikel"
                          className="h-16 w-16 object-cover rounded text-center"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.gambar ? item.gambar.length : 0}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center gap-3 text-lg">
                        <Link
                          href={`/admin/artikel/${item.id}`}
                          className="text-blue-600 hover:rounded transition-transform hover:scale-110 cursor-pointer"
                          title="Lihat"
                        >
                          <FaEye size={20} />
                        </Link>
                        <Link
                          href={`/admin/artikel/tambah?id=${item.id}`}
                          className="text-yellow-500 hover:rounded transition-transform hover:scale-110 cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit size={21} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="text-red-600 hover:rounded transition-transform hover:scale-110 cursor-pointer"
                          title="Hapus"
                        >
                          <FaTrash size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Modal Konfirmasi */}
          <DeleteModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleDelete}
            judul="Konfirmasi Hapus Artikel"
          />
        </div>
        {/* Error Toast */}
        <ErrorToast
          message={errorToastMessage}
          isOpen={errorToastOpen}
          onClose={() => setErrorToastOpen(false)}
        />
        {/* Success Toast */}
        <SuccessToast
          isOpen={successToastOpen}
          onClose={() => setSuccessToastOpen(false)}
          message={successToastMessage}
        />
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
