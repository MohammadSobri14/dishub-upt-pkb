"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTachometerAlt, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const router = useRouter();

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold p-4 border-b text-center border-gray-700">
            Admin Panel
          </h2>
          <nav className="p-4">
            <ul className="space-y-3">
              <li>
                <a
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/artikel"
                  className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  <FaFileAlt />
                  <span>Kelola Artikel</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer rounded text-white"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</main>
    </div>
  );
}
