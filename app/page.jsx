import Navbar from "./pages/Navbar";
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Layanan from "./pages/Layanan";
import Gallery from "./pages/Gallery";
import Berita from "./pages/Berita"

export default function Home() {
  return (
    <>
      <Navbar />
      <Beranda />
      <Profil />
      <Layanan />
      <Gallery />
      <Berita />
    </>
  );
}
