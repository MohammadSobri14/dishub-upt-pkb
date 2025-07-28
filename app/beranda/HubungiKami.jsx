import React from "react";
import { MapPin, Phone, Mail } from "lucide-react"; // pakai lucide-react untuk ikon

const HubungiKami = () => {
  return (
    <section
      className="text-white relative overflow-hidden h-[480px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg-hubungi-kami.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Wave background (opsional jika pakai gambar background) */}
      <div className="max-w-5xl mx-auto px-4 my-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-9 border-b-4 border-[#F3C623] inline-block">
          Hubungi Kami
        </h2>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-200">
          Kami menghargai partisipasi dan kepedulian anda terhadap layanan
          pengujian kendaraan bermotor di Kota Yogyakarta. Apabila anda memiliki
          pertanyaan, membutuhkan informasi lebih lanjut, atau ingin mengetahui
          lebih banyak tentang layanan kami, silakan hubungi kami melalui
          saluran yang tersedia di bawah ini. <br /> Kami siap membantu dan
          memberikan pelayanan terbaik untuk Anda.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="flex flex-col my-15 md:flex-row justify-center gap-4 px-6">
        <div className="bg-[#FFC800] text-[#120378] rounded-xl flex items-center gap-4 px-6 py-4 shadow-lg">
          <MapPin size={28} />
          <div>
            <p className="font-semibold leading-tight">
              Giwangan, Umbulharjo, Yogyakarta,
              <br /> DI Yogyakarta
            </p>
          </div>
        </div>

        <div className="bg-[#FFC800] text-[#120378] rounded-xl flex items-center gap-4 px-6 py-4 shadow-lg">
          <Phone size={28} />
          <div>
            <p className="font-semibold leading-tight">+2034 4040 3030</p>
          </div>
        </div>

        <div className="bg-[#FFC800] text-[#120378] rounded-xl flex items-center gap-4 px-6 py-4 shadow-lg">
          <Mail size={28} />
          <div>
            <p className="font-semibold leading-tight">uptpkbjogja@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubungiKami;
