"use client";

import { useEffect, useState } from "react";
import SpinnerLoader from "../../Components/SpinnerLoader";

export default function KelolaUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "http://127.0.0.1:8000/api/auth/register";
      let method = "POST";
      if (editingId) {
        url = `http://127.0.0.1:8000/api/auth/users/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        alert(editingId ? "User berhasil diperbarui" : "User berhasil dibuat");
        setForm({ name: "", email: "", password: "" });
        setEditingId(null);
        fetchUsers();
      } else {
        alert("Terjadi kesalahan: " + JSON.stringify(data.message));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan user");
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: "" });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah yakin ingin menghapus user ini?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/auth/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("User berhasil dihapus");
        fetchUsers();
      } else {
        alert("Gagal menghapus user");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus user");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Kelola Pengguna</h1>

      {/* Form Tambah/Edit */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col sm:flex-row gap-3 items-start"
      >
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded w-full"
          required={!editingId}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Tambah User"}
        </button>
      </form>

      {/* Tabel Users */}
      <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="text-4xs uppercase bg-[#341B6E] text-white border-b border-[#ccc]">
          <tr>
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
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
                  {[...Array(4)].map((__, idx) => (
                    <td key={idx} className="py-3 px-4 text-center">
                      <div className="h-4 bg-gray-300 rounded animate-pulse max-w-[80px] mx-auto"></div>
                    </td>
                  ))}
                </tr>
              ))
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                Tidak ada user.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="text-gray-800 border-b border-gray-200 odd:bg-white even:bg-gray-100"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
