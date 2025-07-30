import Navbar from "../navbar";
import Maps from "./Maps";
import Footer from "../Components/Footer";
import Faq from "./Faq";
import WhatsAppFloatingButton from "../Components/WhatsAppFloatingButton";

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <Maps />
      <Faq />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
