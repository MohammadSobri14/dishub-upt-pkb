import Navbar from "../navbar";
import LayananSection from "./Layanan";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-10">
        <LayananSection />
        {/* Tambah bagian lain nanti */}
      </main>
    </>
  );
}
