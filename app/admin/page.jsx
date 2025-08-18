"use client";

import { useEffect, useState } from "react";
import { FaNewspaper, FaUsers } from "react-icons/fa";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBerita: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      try {
        // Fetch artikel
        const resBerita = await fetch("http://127.0.0.1:8000/api/artikel", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const dataBerita = await resBerita.json();

        // Fetch users
        const resUsers = await fetch("http://127.0.0.1:8000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const dataUsers = await resUsers.json();

        setStats({
          totalBerita: dataBerita.data ? dataBerita.data.length : 0,
          totalUsers: dataUsers.users ? dataUsers.users.length : 0,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);


  const cards = [
    {
      title: "Total Artikel",
      value: stats.totalBerita,
      icon: <FaNewspaper className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Admin",
      value: stats.totalUsers,
      icon: <FaUsers className="w-8 h-8 text-green-600" />,
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="px-6 py-6 my-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.bg} p-6 rounded-xl shadow hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center`}
          >
            <div className="mb-3">{card.icon}</div>
            <p className="text-gray-700 font-semibold mb-2">{card.title}</p>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
