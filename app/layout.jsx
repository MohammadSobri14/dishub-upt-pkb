import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import font dari Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata untuk SEO / Head
export const metadata = {
  title: "UPT PKB",
  description: "Sistem informasi pelayanan UPT PKB",
};

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
