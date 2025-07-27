import React from "react";

const HubungiKami = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-10 lg:px-8">
        <div className="mt-8 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden my-10 shadow-md">
              <iframe
                title="Lokasi Uji Kir Jogjakarta"
                width="100%"
                height="480"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d406.5786246059933!2d110.393805!3d-7.836112000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a56e27b8a7703%3A0x71156b2d5bd0ab25!2sUji%20Kir%20Jogjakarta!5e1!3m2!1sid!2sus!4v1753425242736!5m2!1sid!2sus"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Kontak Info */}
            <div>
              <div className="max-w-2xl py-5 lg:max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-[#341B6E] border-b-4 border-[#F3C623] inline-block">
                  Kontak Kami
                </h2>
              </div>
              <div className="max-w-full mx-auto my-10 rounded-lg overflow-hidden bg-white shadow-md">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Our Address
                  </h3>
                  <p className="mt-1 text-gray-600">
                    123 Main St, San Francisco, CA 94105
                  </p>
                </div>

                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-600">
                    Monday - Friday: 9am - 5pm
                  </p>
                  <p className="mt-1 text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="mt-1 text-gray-600">Sunday: Closed</p>
                </div>

                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Kontak</h3>
                  <p className="mt-1 text-gray-600">Email: info@example.com</p>
                  <p className="mt-1 text-gray-600">Phone: +1 23494 34993</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubungiKami;
