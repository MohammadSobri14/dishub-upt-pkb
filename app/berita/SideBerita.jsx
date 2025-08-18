"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { FaImage } from "react-icons/fa";

// Fungsi bantu: ubah judul jadi slug
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Fungsi bantu: hapus tag HTML
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

// Fungsi bantu: format tanggal (dd MMMM yyyy)
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const SideBerita = ({ image, title, date, description }) => {
  const slug = slugify(title);
  const cleanDescription = stripHtml(description);
  const formattedDate = formatDate(date);

  return (
    <div className="group relative bg-white rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:transform cursor-pointer w-[620px] h-[482px] mx-auto">
      {/* Gambar */}
      <div className="relative w-full h-80 overflow-hidden flex items-center justify-center bg-gray-100">
        {image && image !== "/images/default.png" ? (
          <Image
            src={image}
            alt={title}
            width={800}
            height={550}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaImage className="text-gray-400 text-6xl" />
          </div>
        )}

        {/* Icon Eye muncul saat hover */}
        <Link
          href={`/berita/${slug}`}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="text-white w-10 h-10" />
        </Link>
      </div>

      {/* Konten */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
        <p className="text-base text-gray-600 mt-3 line-clamp-5">
          {cleanDescription}
        </p>
      </div>
    </div>
  );
};

export default SideBerita;
