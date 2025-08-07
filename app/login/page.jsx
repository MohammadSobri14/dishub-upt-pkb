"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import SuccessToast from "../Components/SuccessToast";
import ErrorToast from "../Components/ErrorToast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Email dan password wajib diisi");
      setShowError(true);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setShowError(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let message = data.message?.toLowerCase();
        if (message?.includes("unauthorized")) {
          throw new Error("Email atau password salah");
        }
        throw new Error("Login gagal. Silakan coba lagi.");
      }

      // ✅ Verifikasi token tersedia
      if (!data?.data?.access_token) {
        throw new Error("Token tidak ditemukan dalam response.");
      }

      // ✅ Simpan token & user info ke localStorage
      localStorage.setItem("token", data.data.access_token);
      localStorage.setItem("name", data.user?.name || "");
      localStorage.setItem("role", data.user?.role || "");
      localStorage.setItem("userId", data.user?.id || "");

      // Simpan juga ke cookie jika dibutuhkan
      document.cookie = `token=${data.token}; path=/`;

      setSuccessMsg("Login berhasil! Mengalihkan...");
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login Admin
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className={`w-full pl-10 pr-4 py-2 border ${
                  touched.email && !isValidEmail(email)
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched({ ...touched, email: true })}
                placeholder="Masukkan email"
              />
            </div>
            {touched.email && !isValidEmail(email) && (
              <p className="text-sm text-red-500 mt-1">
                Format email tidak valid
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-10 py-2 border ${
                  !password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
                placeholder="Masukkan password"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {!password && touched.password && (
              <p className="text-sm text-red-500 mt-1">Password wajib diisi</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold rounded-lg flex items-center justify-center transition duration-300"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* Toasts */}
      <ErrorToast
        isOpen={showError}
        message={errorMsg}
        onClose={() => setShowError(false)}
      />
      <SuccessToast
        isOpen={showSuccess}
        message={successMsg}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
