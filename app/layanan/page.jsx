import Navbar from "../navbar";
import LayananSection from "./Layanan";
import Footer from "../Components/Footer";
import StandarPelayanan from "./StandarPelayanan";
import Pendaftaran from "./Pendaftaran";
import Loket from "./Loket";
import WhatsAppFloatingButton from "../Components/WhatsAppFloatingButton";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <LayananSection />
        <StandarPelayanan />
        <Pendaftaran />
        <Loket />
        <Footer />
      </main>
        <WhatsAppFloatingButton />
    </>
  );
}
