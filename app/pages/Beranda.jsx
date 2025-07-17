"use client";

import Image from "next/image";

const Beranda = () => {
  return (
    <section className="w-[1158px] h-[542px] mx-auto flex justify-start items-center relative">
      {/* Kiri: Teks utama */}
      <div className="w-[640px] h-[373px] flex flex-col justify-between items-start z-10">
        {/* Judul */}
        <div className="p-2.5">
          <h1 className="text-[43px] font-bold font-poppins text-black leading-snug">
            Selamat datang di website
            <br />
            Dinas <span className="text-[#f5cf38]">Kesehatan</span>
          </h1>
        </div>

        {/* Deskripsi dan tombol */}
        <div className="h-[191.5px] flex flex-col justify-between items-start">
          <div className="p-2.5">
            <p className="text-[#2e3e5c] text-xl font-normal font-poppins leading-relaxed">
              Halaman ini merupakan website resmi <br />
              Dinas Kesehatan Kabupaten Nias Selatan <br />
              yang akan melayani anda.
            </p>
          </div>

          <div className="px-2.5 flex gap-7">
            {/* Tombol Hubungi Kami */}
            <button className="p-2.5 bg-[#2ee4db] rounded-lg text-white text-base font-poppins">
              Hubungi Kami
            </button>

            {/* Tonton Video */}
            <div className="w-[238px] flex items-center gap-4">
              <div className="w-11 h-11 bg-[#881c1c] rounded-full outline-[#2ee4db]" />
              <p className="text-[#2e3e5c] text-base font-normal font-poppins leading-tight">
                Tonton video
                <br />
                pengantar profil kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beranda;
