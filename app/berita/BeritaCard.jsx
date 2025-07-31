"use client";

import Image from "next/image";

const BeritaCard = ({ image, title, date, layout = "horizontal" }) => {
  const isVertical = layout === "vertical";

  return (
    <div
      className={`${
        isVertical ? "flex-col max-w-xs" : "flex-row max-w-full ml-16 pr-1"
      } flex bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
    >
      <Image
        src={image}
        alt={title}
        width={isVertical ? 400 : 232}
        height={isVertical ? 200 : 150}
        className={`object-cover ${
          isVertical ? "w-full h-[200px]" : "w-[232px] h-full"
        }`}
      />

      <div className={`${isVertical ? "p-4" : "pl-3 pt-2"}`}>
        <h2 className="font-semibold text-base leading-snug text-black">
          {title}
        </h2>
        <p className="text-sm text-gray-400 mt-2">{date}</p>
      </div>
    </div>
  );
};

export default BeritaCard;
