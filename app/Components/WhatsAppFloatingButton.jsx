"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/6285156181586"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-all duration-300"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
};

export default WhatsAppFloatingButton;
