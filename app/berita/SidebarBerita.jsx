"use client";

import Image from "next/image";
import Link from "next/link";

// Fungsi bantu: ubah judul jadi slug
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const SidebarBerita = ({ image, title, date, description }) => {
  const slug = slugify(title);

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <Image
        src={image}
        alt={title}
        width={642}
        height={358}
        className="object-cover w-full h-auto"
      />
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
        <p className="text-xs text-gray-600 mt-2 line-clamp-6">{description}</p>

        <Link
          href={`/berita/${slug}`}
          className="mt-3 inline-block text-sm text-blue-600 hover:underline transition"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </div>
  );
};

export default SidebarBerita;
