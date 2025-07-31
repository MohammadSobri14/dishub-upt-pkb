import localFont from "next/font/local";
import "./globals.css";

// Geist Sans
const geistSans = localFont({
  src: "./fonts/geist/webfonts/Geist-Regular.woff2",
  display: "swap",
  variable: "--font-geist-sans",
});

// Geist Mono
const geistMono = localFont({
  src: "./fonts/geist-mono/webfonts/GeistMono-Regular.woff2",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "UPT PKB",
  description: "Sistem informasi pelayanan UPT PKB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-white text-gray-900">{children}</body>
    </html>
  );
}
