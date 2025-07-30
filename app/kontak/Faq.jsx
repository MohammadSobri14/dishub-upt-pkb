"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const faqData = [
  {
    question:
      "Bagaimana cara mendaftar uji kendaraan di UPT PKB Kota Yogyakarta?",
    answer:
      "Pendaftaran uji kendaraan di UPT PKB Kota Yogyakarta dapat dilakukan secara online melalui aplikasi Jogja Smart Service (JSS) pada menu SIREGOL (Sistem Registrasi Online). Selain itu, pengguna juga dapat mendaftar langsung dengan datang ke kantor UPT PKB sesuai jam layanan yang berlaku. Pastikan dokumen dan kendaraan dalam kondisi siap uji saat mengikuti proses pemeriksaan.",
  },
  {
    question: "Apakah tersedia layanan Drive Thru?",
    answer: "Ya, layanan Drive Thru tersedia untuk jenis uji tertentu.",
  },
  {
    question: "Bagaimana jika kendaraan saya tidak lulus uji?",
    answer:
      "Kendaraan dapat diuji ulang setelah perbaikan sesuai dengan ketentuan.",
  },
  {
    question: "Apa itu uji berkala kendaraan bermotor?",
    answer:
      "Uji berkala adalah pemeriksaan rutin untuk memastikan kelayakan kendaraan.",
  },
  {
    question: "Berapa lama masa berlaku uji kendaraan bermotor?",
    answer:
      "Biasanya berlaku selama 6 bulan atau 1 tahun tergantung jenis kendaraan.",
  },
  {
    question: "Mengapa kendaraan harus diuji di UPT PKB?",
    answer:
      "Untuk memastikan kendaraan memenuhi standar keselamatan dan emisi.",
  },
  {
    question: "Apa yang dimaksud dengan uji KIR?",
    answer: "Uji KIR adalah istilah umum untuk uji berkala kendaraan bermotor.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Ilustrasi */}
        <div className="hidden md:block">
          <img
            src="/images/faq.png"
            alt="FAQ Illustration"
            className="w-full"
          />
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl text-black font-bold mb-10 border-b-4 border-[#F3C623] inline-block">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b pb-4"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: activeIndex === index ? 45 : 0,
                        scale: activeIndex === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <FaPlus className="text-gray-500" />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-700 mt-2 text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
