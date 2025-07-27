import Navbar from "../navbar";
import KontakSection from "./Kontak";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-10">
        <KontakSection />
        {/* Tambah bagian lain nanti */}
      </main>
    </>
  );
}
