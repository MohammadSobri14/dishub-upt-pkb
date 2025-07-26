import Navbar from "./pages/Navbar";
import Beranda from "./pages/HomePage/Beranda";
import Profil from "./pages/HomePage/Profil";
import Layanan from "./pages/HomePage/Layanan";
import Gallery from "./pages/HomePage/Gallery";
import Berita from "./pages/HomePage/Berita"
import Kontak from "./pages/HomePage/Kontak";

export default function Home() {
  return (
    <>
      <Navbar />
      <Beranda />
      <Profil />
      <Layanan />
      <Berita />
      <Gallery />
      <Kontak />
    </>
  );
}
