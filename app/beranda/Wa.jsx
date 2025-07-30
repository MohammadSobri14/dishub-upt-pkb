import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/6285156181586"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full shadow-lg hover:bg-[#1ebe5d] transition-all duration-300"
    >
      <FaWhatsapp className="text-xl" />
      Hubungi Kami
    </a>
  );
};

export default WhatsAppButton;
