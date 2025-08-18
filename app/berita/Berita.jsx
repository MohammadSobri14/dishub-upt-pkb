"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeritaCard from "./BeritaCard";
import SideBerita from "./SideBerita";

// ⬅️ Skeleton loading
function SkeletonCard({ type = "horizontal" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200 ${
        type === "side" ? "h-[482px] w-[590px]" : "h-[150px] w-full"
      }`}
    ></div>
  );
}

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token tidak ditemukan, user belum login.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://127.0.0.1:8000/api/artikel", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (data.success) {
          setBeritaList(data.data);
        } else {
          console.error("Gagal ambil artikel:", data.message);
        }
      } catch (err) {
        console.error("Error fetch artikel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <section
      className="w-full px-6 mt-12 py-10 bg-gray-50 bg-repeat"
      style={{ backgroundImage: "url('/images/bg-batik.png')" }}
    >
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#341B6E] mb-4 border-b-4 border-[#F3C623] inline-block">
          Berita Terbaru
        </h2>
      </div>

      <div className="max-w-7xl bg-white mx-auto px-4 py-5 rounded-2xl space-y-10">
        {loading ? (
          <>
            {/* Skeleton Grid isi utama */}
            <main className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <aside className="md:col-span-2 ml-2 space-y-6 w-[640px]">
                <SkeletonCard type="side" />
              </aside>
              <div className="md:col-span-2 space-y-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </main>

            {/* Skeleton Berita Lainnya */}
            <div>
              <div className="flex items-center mb-4">
                <div className="border-l-4 border-[#F3C623] pl-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Berita Lainnya
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </>
        ) : beritaList.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada berita.</p>
        ) : (
          <>
            {/* Grid isi utama */}
            <main className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              {/* Side Berita */}
              <aside className="md:col-span-2 ml-2 space-y-6 w-[640px]">
                {beritaList.length > 0 && (
                  <SideBerita
                    key={beritaList[0].id}
                    title={beritaList[0].judul}
                    date={beritaList[0].tanggal_publish}
                    description={beritaList[0].isi?.substring(0, 150) + "..."}
                    image={beritaList[0].gambar?.[0] || "/images/default.png"}
                  />
                )}
              </aside>

              {/* Berita Horizontal */}
              <div className="md:col-span-2 space-y-4">
                {beritaList.slice(1, 4).map((berita, idx) => (
                  <BeritaCard
                    key={berita.id || idx}
                    title={berita.judul}
                    date={berita.tanggal_publish}
                    description={berita.isi?.substring(0, 150) + "..."}
                    image={berita.gambar?.[0] || "/images/default.png"}
                  />
                ))}
              </div>
            </main>

            {/* Berita Vertikal */}
            <div>
              <div className="flex items-center mb-4">
                <div className="border-l-4 border-[#F3C623] pl-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Berita Lainnya
                  </h3>
                  <div className="relative left-38 -top-3 w-[1030px] h-[2px] bg-[#F3C623] "></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                <AnimatePresence>
                  {beritaList.slice(4, 4 + visibleCount).map((berita, idx) => (
                    <motion.div
                      key={berita.id || idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <BeritaCard
                        title={berita.judul}
                        date={berita.tanggal_publish}
                        description={berita.isi?.substring(0, 150) + "..."}
                        image={berita.gambar?.[0] || "/images/default.png"}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Tombol Berita Lainnya */}
              {visibleCount + 4 < beritaList.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-[#341B6E] text-white font-semibold rounded-lg shadow hover:bg-[#2a1459] transition cursor-pointer"
                  >
                    Berita Lainnya
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
