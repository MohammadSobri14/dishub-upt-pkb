import Navbar from "../navbar";
import BeritaSection from "./Berita";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-10">
        <BeritaSection />
        {/* Tambah bagian lain nanti */}
      </main>
    </>
  );
}
