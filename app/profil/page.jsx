import Navbar from "../navbar";
import SejarahSection from "./Sejarah";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-10">
        <SejarahSection />
        {/* Tambah bagian lain nanti */}
      </main>
    </>
  );
}
