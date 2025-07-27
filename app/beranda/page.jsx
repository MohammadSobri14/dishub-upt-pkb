import Hero from "./Hero";
import Profil from "./TentangKami";
import Layanan from "./LayananKami";
import Berita from "./BeritaTerbaru";
import Gallery from "./Gallery";
import Kontak from "./HubungiKami";
import RatingEmote from "./RatingEmote";
import Navbar from "../navbar";

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
      <RatingEmote />
    </>
  );
}
