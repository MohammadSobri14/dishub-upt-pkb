"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { FaImage } from "react-icons/fa";

const BeritaCard = ({
  id,
  image,
  title,
  date,
  description,
  layout = "horizontal",
}) => {
  const isVertical = layout === "vertical";

  // format tanggal -> dd-mm-yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // hapus tag HTML di deskripsi
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const slug = slugify(title);

  return (
    <Link
      href={`/berita/${slug}`}
      className={`group relative ${
        isVertical ? "flex-col max-w-xs" : "flex-row max-w-full ml-16 pr-1"
      } flex bg-white rounded-md overflow-hidden shadow-md transform transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
    >
      {/* Gambar */}
      <div
        className={`relative ${
          isVertical ? "w-full h-[200px]" : "w-[232px] h-[150px]"
        } flex-shrink-0 bg-gray-100`}
      >
        {image && image !== "/images/default.png" ? (
          <Image
            src={image}
            alt={title}
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaImage className="text-gray-400 text-6xl" />
          </div>
        )}

        {/* Overlay Icon saat hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Eye className="text-white w-8 h-8" />
        </div>
      </div>

      {/* Konten */}
      <div className={`${isVertical ? "p-4" : "py-2 pl-4 flex flex-col"}`}>
        <h2 className="font-semibold text-base leading-snug text-black">
          {title}
        </h2>
        <p className="text-sm text-gray-400 mt-1">{formatDate(date)}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {stripHtml(description)}
        </p>
      </div>
    </Link>
  );
};

export default BeritaCard;
