import Navbar from "../navbar";
import TentangKami from "../beranda/TentangKami";
import VisiMisi from "./VisiMisi";
import Footer from "../Components/Footer";
import StrukturOrganisasi from "./StrukturOrganisasi";
import TugasFungsiPage from "./TugasFungsi";
import AkreditasiPage from "./Akreditasi";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <TentangKami />
      <VisiMisi />
      <TugasFungsiPage />
      <StrukturOrganisasi />
      <AkreditasiPage />
      <Footer />
    </>
  );
}
