import Navbar from "../navbar";
import Hero from "./Hero";
import Profil from "./TentangKami";
import Layanan from "./LayananKami";
import Berita from "./BeritaTerbaru";
import Gallery from "./Gallery";
import Kontak from "./HubungiKami";
import RatingEmote from "./RatingEmote";
import FaqPage from "../kontak/Faq";
import Footer from "../Components/Footer";
import WhatsAppFloatingButton from "../Components/WhatsAppFloatingButton";

export default function Beranda() {
  return (
    <>
      <Navbar />
      <Hero />
      <Profil />
      <Layanan />
      <Berita />
      <Gallery />
      <Kontak />
      <FaqPage />
      <RatingEmote />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
