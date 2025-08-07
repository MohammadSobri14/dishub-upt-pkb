// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Cek jika user mengakses halaman admin tapi belum login
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Tentukan route yang diproteksi
export const config = {
  matcher: ["/admin/:path*"],
};
