"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navItems = [
  { name: "Beranda", href: "#beranda" },
  { name: "Profil", href: "#profil" },
  { name: "Layanan", href: "#layanan" },
  { name: "Berita", href: "#berita" },
  { name: "Kontak", href: "#kontak" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#beranda");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Observer untuk mendeteksi elemen yang sedang terlihat
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(`#${id}`);
            }
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px", // untuk menyesuaikan trigger scroll
        threshold: 0.1,
      }
    );

    // Observe semua section sesuai navItems
    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md shadow-md"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-[1280px] px-[50px] mx-auto flex items-center justify-between py-4">
        {/* Logo + Nama */}
        <a href="#beranda" className="z-10 flex items-center gap-2 cursor-pointer">
          <Image
            src="/images/logo-Dishub.png"
            alt="Logo Dishub"
            width={30}
            height={35}
            className="object-contain"
          />
          <Image
            src="/images/logo-pemkot.png"
            alt="Logo Pemkot"
            width={28}
            height={38}
            className="object-contain"
          />
          <div className="px-2 leading-tight">
            <p className="text-[#341B6E] text-base font-bold font-poppins tracking-wide">
              Dinas Perhubungan
            </p>
            <p className="text-sm font-medium text-[#d4a90cdc] font-poppins">
              Kota Yogyakarta
            </p>
          </div>
        </a>

        {/* Navigasi */}
        <div className="absolute hidden gap-8 -translate-x-1/2 md:flex left-1/2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a key={item.name} href={item.href}>
                <span
                  className={`relative text-base font-poppins cursor-pointer transition-all duration-200 
                  ${isActive ? "text-[#341B6E] font-semibold" : "text-black font-normal"}
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                  after:bg-[#d4a90cdc] after:transform after:scale-x-0 after:transition-transform after:duration-300 
                  after:ease-in-out hover:after:scale-x-100 
                  ${isActive ? "after:scale-x-100" : ""} after:origin-left
                `}
                >
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>

        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
