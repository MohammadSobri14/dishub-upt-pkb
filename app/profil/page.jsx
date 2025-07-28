import Navbar from "../navbar";
import TentangKami from "../beranda/TentangKami";
import VisiMisi from "./VisiMisi";
import Footer from "../Components/Footer";
import StrukturOrganisasi from "./StrukturOrganisasi";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <TentangKami />
      <VisiMisi />
      <StrukturOrganisasi />
      <Footer />
    </>
  );
}
