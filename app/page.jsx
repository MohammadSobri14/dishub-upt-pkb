import Navbar from "./pages/Navbar";
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Layanan from "./pages/Layanan";

export default function Home() {
  return (
    <>
      <Navbar />
      <Beranda />
      <Profil />
      <Layanan />
    </>
  );
}
