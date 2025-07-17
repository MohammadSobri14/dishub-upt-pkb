"use client";

import Link from "next/link";
import Image from "next/image";

const navItems = [
  { name: "Beranda", href: "/", isActive: true },
  { name: "Profil", href: "/profil" },
  { name: "Layanan", href: "/layanan" },
  { name: "Artikel", href: "/artikel" },
  { name: "Kontak", href: "/kontak" },
];

const Navbar = () => {
  return (
    <nav className="relative z-50 w-full py-4 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-[1280px] px-[50px] mx-auto flex items-center justify-between relative">
        {/* Logo + Nama */}
        <div className="z-10 flex items-center gap-4">
          <Image
            src="/images/logo-pemkot.png"
            alt="Logo Pemkot"
            width={30}
            height={30}
            className="object-contain"
          />
          <div className="leading-tight">
            <p className="text-[#f5cf38] text-base font-bold font-poppins tracking-wide">
              Dinas Perhubungan
            </p>
            <p className="text-sm font-medium text-black font-poppins">
              Kota Yogyakarta
            </p>
          </div>
        </div>

        {/* Navigasi di Tengah */}
        <div className="absolute hidden gap-8 -translate-x-1/2 md:flex left-1/2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                className={`text-base font-poppins cursor-pointer transition-colors duration-200 ${
                  item.isActive
                    ? "text-[#f5cf38] font-semibold"
                    : "text-black font-normal"
                } hover:text-[#f5cf38]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* (Opsional) Tambahan kanan */}
        <div className="w-[186px] h-[48px] bg-[#f9f9f9] rounded-lg hidden lg:flex items-center justify-center z-10">
          {/* Kosongkan atau isi tombol/icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
