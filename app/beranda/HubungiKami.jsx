import React from "react";
import { MapPin, Phone, Mail } from "lucide-react"; // pakai lucide-react untuk ikon

const HubungiKami = () => {
  return (
    <section
      className="text-white relative overflow-hidden bg-cover bg-center py-16"
      style={{
        backgroundImage: "url('/images/bg-hubungi-kami.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading + Deskripsi */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 border-b-4 border-[#F3C623] inline-block">
          Hubungi Kami
        </h2>
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
          Kami menghargai partisipasi dan kepedulian anda terhadap layanan
          pengujian kendaraan bermotor di Kota Yogyakarta. Apabila anda memiliki
          pertanyaan, membutuhkan informasi lebih lanjut, atau ingin mengetahui
          lebih banyak tentang layanan kami, silakan hubungi kami melalui
          saluran yang tersedia di bawah ini. <br className="hidden sm:block" />
          Kami siap membantu dan memberikan pelayanan terbaik untuk Anda.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {/* Alamat */}
        <div className="bg-[#FFC800] text-[#120378] rounded-xl flex items-center gap-4 px-6 py-5 shadow-lg">
          <MapPin size={28} />
          <div>
            <p className="font-semibold leading-tight text-sm sm:text-base">
              Giwangan, Umbulharjo, Yogyakarta,
              <br /> DI Yogyakarta
            </p>
          </div>
        </div>

        {/* Telepon */}
        <div className="bg-[#FFC800] text-[#120378] rounded-xl flex items-center gap-4 px-6 py-5 shadow-lg">
          <Phone size={28} />
          <div>
            <p className="font-semibold leading-tight text-sm sm:text-base">
              +2034 4040 3030
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-[#FFC800] text-[#120378] rounded-xl flex items-center gap-4 px-6 py-5 shadow-lg">
          <Mail size={28} />
          <div>
            <p className="font-semibold leading-tight text-sm sm:text-base">
              uptpkbjogja@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubungiKami;
