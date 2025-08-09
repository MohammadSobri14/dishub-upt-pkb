"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Ambil state dari localStorage di awal
  useEffect(() => {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) setSidebarOpen(saved === "true");
  }, []);

  // Simpan setiap kali berubah
  useEffect(() => {
    localStorage.setItem("sidebarOpen", sidebarOpen.toString());
  }, [sidebarOpen]);

  // Cek token sekali di awal
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-21"
        } bg-gradient-to-b from-indigo-500/70 via-purple-500/70 to-pink-500/70 
backdrop-blur-lg text-[#341B6E] flex flex-col justify-between 
transition-all duration-300 overflow-hidden border-r border-white/10
shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]`}
      >
        <div>
          <div className="relative border-b border-gray-700 py-5">
            {sidebarOpen && (
              <div className="flex items-center mr-6 justify-center gap-3 -mb-7">
                <img
                  src="/images/logo-dishub.png"
                  alt="Logo"
                  className="w-7 h-7 object-contain"
                />
                <h2 className="text-xl font-bold text-[#341B6E]">
                  Admin UPT PKB
                </h2>
              </div>
            )}

            <button
              onClick={toggleSidebar}
              className="w-full -ml-2 focus:outline-none hover:cursor-pointer"
            >
              {sidebarOpen ? (
                <div className="flex justify-end mt-1 mr-1.5">
                  <FaTimes className="text-xl hover:text-red-500 transition-colors duration-200" />
                </div>
              ) : (
                <div className="flex items-center justify-center ml-4">
                  <FaBars className="text-2xl" />
                </div>
              )}
            </button>
          </div>

          <nav className="px-4 py-5">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                    pathname === "/admin"
                      ? "bg-[#341B6E] text-white" // active
                      : "text-[#341B6E] hover:bg-[#341B6E] hover:text-white" // hover
                  }`}
                >
                  <FaTachometerAlt className="text-xl" />
                  {sidebarOpen && <span className="truncate">Dashboard</span>}
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/artikel"
                  className={`flex items-center gap-3 px-4 py-2 rounded transition ${
                    pathname.startsWith("/admin/artikel")
                      ? "bg-[#341B6E] text-white" // active
                      : "text-[#341B6E] hover:bg-[#341B6E] hover:text-white" // hover
                  }`}
                >
                  <FaFileAlt className="text-xl" />
                  {sidebarOpen && (
                    <span className="truncate">Kelola Artikel</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer rounded text-white"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 bg-gray-100 overflow-auto relative transition-shadow scrollbar-hide duration-300 ${
          sidebarOpen ? "shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]" : ""
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
