import BeritaCard from "./BeritaCard";
import SidebarBerita from "./SidebarBerita";

const beritaList = [
  {
    image: "/images/berita.png",
    title:
      'Dinas Perhubungan DIY Gelar "NGOPI": Soroti Tantangan Pengendalian Kecepatan Lalu Lintas yang Berbudaya',
    date: "27/06/2025",
    description:
      "Yogyakarta – Dalam upaya menekan angka kecelakaan lalu lintas di Daerah Istimewa Yogyakarta (DIY), Dinas Perhubungan (Dishub) DIY menggelar forum diskusi bertajuk NGOPI (Ngobrol Permasalahan Transportasi) dengan tema “Alon-Alon Waton Klakon: Budaya vs Kecepatan”. Acara ini dibuka oleh Kepala Dishub DIY, Chrestina Erni Widyastuti, S.E., M.Si. dan menghadirkan tiga narasumber utama yaitu Anggota Komisi C DPRD DIY ...",
  },
  // Tambahkan berita lain jika diperlukan
];

export default function BeritaPage() {
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

      {/* Container utama bg-white */}
      <div className="max-w-7xl bg-white mx-auto px-4 py-5 rounded-2xl space-y-10">
        {/* Grid isi utama: Sidebar dan horizontal */}
        <main className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Sidebar */}
          <aside className="md:col-span-2 ml-2 space-y-6 w-[642px] h-[570px] overflow-y-auto">
            {beritaList.map((berita, idx) => (
              <SidebarBerita key={idx} {...berita} />
            ))}
          </aside>

          {/* Berita Horizontal */}
          <div className="md:col-span-2 space-y-4">
            {Array(4)
              .fill(null)
              .map((_, i) =>
                beritaList.map((berita, idx) => (
                  <BeritaCard key={`h-${i}-${idx}`} {...berita} />
                ))
              )}
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
            {beritaList.slice(0, 10).map((berita, idx) => (
              <BeritaCard key={`v-${idx}`} {...berita} layout="vertical" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
