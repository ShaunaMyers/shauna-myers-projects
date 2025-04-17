import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Creative Journey | Art, Sustainability & Code",
  description:
    "Exploring the intersection of art, sustainability, and technology through various creative projects and adventures in Colorado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body
        className={cn(
          inter.className,
          "bg-[linear-gradient(135deg,theme(colors.teal.900)_0%,theme(colors.amber.800)_45%,theme(colors.orange.700)_50%,theme(colors.amber.800)_55%,theme(colors.teal.900)_100%)] min-h-screen text-slate-50 overflow-x-hidden"
        )}
      >
        <div className="flex min-h-screen flex-col bg-gradient-radial from-transparent via-black/20 to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,theme(colors.teal.800/0.7),transparent_45%),radial-gradient(circle_at_top_left,theme(colors.teal.800/0.5),transparent_50%)] pointer-events-none"></div>

          {/* Animated Sun */}
          <div className="sun-rays">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="sun-ray"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  opacity: i % 2 === 0 ? 0.7 : 0.5,
                }}
              />
            ))}
            <div className="sun-core" />
          </div>

          <header className="relative border-teal-800/30 border-b bg-gradient-to-r from-teal-900/95 via-teal-800/95 to-amber-900/95 backdrop-blur-sm">
            <div className="container py-4 flex items-center justify-between">
              <Link href="/" className="text-xl font-serif hover-lift">
                <span className="text-gradient-southwest">Shauna Myers</span>
              </Link>
              <nav className="flex gap-6">
                <Link
                  href="/blog"
                  className="text-sm text-amber-50 hover:text-orange-100 hover-lift page-transition"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-amber-50 hover:text-orange-100 hover-lift page-transition"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-amber-50 hover:text-orange-100 hover-lift page-transition"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 relative">{children}</main>

          <footer className="relative border-teal-800/30 border-t bg-gradient-to-r from-teal-900/95 via-teal-800/95 to-amber-900/95 backdrop-blur-sm">
            <div className="container py-8 text-center text-sm text-amber-50">
              <p className="hover-lift inline-block">
                © {new Date().getFullYear()} Shauna Myers. Crafting stories in
                code, color, and concrete.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
