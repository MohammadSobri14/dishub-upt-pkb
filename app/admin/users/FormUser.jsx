"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import SuccessToast from "../../Components/SuccessToast";
import ErrorToast from "../../Components/ErrorToast";
import LoadingOverlay from "../../Components/LoadingOverlay";
import SpinnerLoader from "../../Components/SpinnerLoader";

export default function FormUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Ambil data saat edit
  useEffect(() => {
    if (id) {
      // Mode Edit
      setLoading(true);
      const token = localStorage.getItem("token");

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const user = (data.users || []).find((u) => u.id == id);
          if (user) {
            setUsername(user.name || "");
            setEmail(user.email || "");
          } else {
            setErrorMessage("Pengguna tidak ditemukan.");
            setErrorToastOpen(true);
          }
          // kosongkan password
          setPassword("");
          setConfirmPassword("");
        })
        .catch(() => {
          setErrorMessage("Gagal memuat data pengguna.");
          setErrorToastOpen(true);
        })
        .finally(() => setLoading(false));
    } else {
      // Mode Tambah User → reset form kosong
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [id]);

  // Loader saat ambil data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <SpinnerLoader />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      setErrorMessage("Username dan email wajib diisi.");
      setErrorToastOpen(true);
      return;
    }

    if (!id && (!password || !confirmPassword)) {
      setErrorMessage("Password dan konfirmasi password wajib diisi.");
      setErrorToastOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok.");
      setErrorToastOpen(true);
      return;
    }

    setLoading(true);

    let payload;
    if (id) {
      payload = { name: username, email };
      if (password) payload.password = password;
    } else {
      payload = { name: username, email, password, role: "admin" };
    }

    try {
      const token = localStorage.getItem("token");
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Server error");
      }

      setSuccessToastOpen(true);
      setTimeout(() => router.push("/admin/users"), 1500);
    } catch (error) {
      setErrorMessage(error.message || "Gagal menyimpan pengguna.");
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
        message={
          id ? "Pengguna berhasil diperbarui!" : "Pengguna berhasil dibuat!"
        }
      />
      <ErrorToast
        isOpen={errorToastOpen}
        onClose={() => setErrorToastOpen(false)}
        message={errorMessage}
      />

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="mx-auto p-8 my-12 bg-white rounded-lg shadow-lg text-black space-y-6 overflow-auto max-w-3xl"
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
            {id ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </h2>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#341B6E]">Nama</label>
          <input
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Masukkan nama"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-[#341B6E]">Email</label>
          <input
            type="email"
            autoComplete="new-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Masukkan email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="mb-2 font-semibold text-[#341B6E]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={
                id ? "Kosongkan jika tidak ingin diubah" : "Masukkan password"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col relative">
          <label className="mb-2 font-semibold text-[#341B6E]">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={
                id ? "Kosongkan jika tidak ingin diubah" : "Ulangi password"
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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
            {id ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </>
  );
}
