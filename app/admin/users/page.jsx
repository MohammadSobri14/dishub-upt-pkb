"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaSort,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import SuccessToast from "../../Components/SuccessToast";
import ErrorToast from "../../Components/ErrorToast";
import Pagination from "../../Components/Pagination";
import ConfirmDeleteModal from "../../Components/DeleteModal";

export default function KelolaUsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [openSort, setOpenSort] = useState(false);

  // ✅ pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // jumlah data per halaman

  // ✅ toast states
  const [successToast, setSuccessToast] = useState({
    isOpen: false,
    message: "",
  });
  const [errorToast, setErrorToast] = useState({ isOpen: false, message: "" });

  const [userToken, setUserToken] = useState(null);

  // ambil token dari localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setUserToken(token);
      if (token) fetchUsers(token);
    }
  }, []);

  // lalu ubah fetchUsers terima token param
  const fetchUsers = async (token) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setFiltered(data.users);
      }
    } finally {
      setLoading(false);
    }
  };

  // jalankan fetchUsers kalau token sudah siap
  useEffect(() => {
    if (userToken) {
      fetchUsers();
    }
  }, [userToken]);

  // Filtering & Sorting
  useEffect(() => {
    let temp = [...users];
    if (search.trim() !== "") {
      temp = temp.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    temp.sort((a, b) => {
      if (sortOrder === "asc")
        return new Date(a.created_at) - new Date(b.created_at);
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setFiltered(temp);
  }, [search, sortOrder, users]);

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const handleResetFilters = () => {
    setSearch("");
    setSortOrder("desc");
  };

  // Pagination Logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // CRUD

  const handleDelete = async () => {
    if (!selectedUserId || !userToken) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/auth/users/${selectedUserId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setSuccessToast({ isOpen: true, message: "User berhasil dihapus" });
        fetchUsers(userToken);
      } else {
        setErrorToast({ isOpen: true, message: "Gagal menghapus user" });
      }
    } catch (err) {
      console.error(err);
      setErrorToast({ isOpen: true, message: "Terjadi kesalahan server" });
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="px-6 py-2 my-12 bg-white shadow rounded text-gray-700">
      {/* ✅ Toaster */}
      <SuccessToast
        isOpen={successToast.isOpen}
        message={successToast.message}
        onClose={() => setSuccessToast({ ...successToast, isOpen: false })}
      />
      <ErrorToast
        isOpen={errorToast.isOpen}
        message={errorToast.message}
        onClose={() => setErrorToast({ ...errorToast, isOpen: false })}
      />
      {/* ✅ Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <h1 className="text-2xl font-bold text-gray-700 my-5">
        Kelola Pengguna
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-3">
        {/* Search + Sorting */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari Pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 sm:w-60 border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:ring-2 text-gray-700 focus:ring-[#341B6E] focus:border-[#341B6E]"
            />
          </div>

          {/* Sorting */}
          <div className="relative w-33">
            <button
              type="button"
              onClick={() => setOpenSort((prev) => !prev)}
              className="w-full border text-gray-700 border-gray-300 pl-10 pr-3 py-2 rounded-lg flex items-center justify-between focus:ring-2 focus:ring-[#341B6E] focus:border-[#341B6E] bg-white hover:cursor-pointer"
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
                  className="flex text-gray-700 items-center justify-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Terbaru <FaArrowUp />
                </div>
                <div
                  onClick={() => {
                    handleSort({ target: { value: "asc" } });
                    setOpenSort(false);
                  }}
                  className="flex text-gray-700 items-center justify-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Terlama <FaArrowDown />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset & Tambah */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center justify-center gap-1.5 bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 cursor-pointer active:scale-95 transition-transform shadow-sm"
          >
            <GrPowerReset className="text-xs" />
            Reset Filter
          </button>
          <button
            onClick={() => router.push("/admin/users/form")} // ⬅️ arahkan ke FormUser
            className="inline-flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 cursor-pointer active:scale-95 transition-transform shadow-sm"
          >
            <FaPlus className="text-xs" /> Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Tabel Users */}
      <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="text-4xs uppercase bg-[#341B6E] text-white border-b border-[#ccc]">
          <tr>
            <th className="py-3 px-4 text-center">No</th>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-center">Tanggal Dibuat</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 odd:bg-white even:bg-gray-100"
                >
                  {[...Array(6)].map(
                    (
                      __,
                      idx // ✅ ubah jadi 6 kolom
                    ) => (
                      <td key={idx} className="py-3 px-4 text-center">
                        <div className="h-4 bg-gray-300 rounded animate-pulse max-w-[80px] mx-auto"></div>
                      </td>
                    )
                  )}
                </tr>
              ))
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center">
                Tidak ada user.
              </td>
            </tr>
          ) : (
            filtered.map((user, index) => (
              <tr
                key={user.id}
                className="text-gray-800 border-b border-gray-200 odd:bg-white even:bg-gray-100"
              >
                <td className="py-3 px-4 text-center">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 text-center">
                  {new Date(user.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-3">
                  <button
                    onClick={() =>
                      router.push(`/admin/users/form?id=${user.id}`)
                    }
                    className="text-yellow-500 hover:rounded transition-transform hover:scale-110 cursor-pointer"
                    title="Edit"
                  >
                    <FaEdit size={21} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:rounded transition-transform hover:scale-110 cursor-pointer"
                    title="Hapus"
                  >
                    <FaTrash size={17} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* ✅ Pagination */}
      {!loading && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}
