import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "ThreadLodge — Boutique Hotel",
  description:
    "Book your perfect stay at ThreadLodge, a boutique hotel with exclusive design and personalized attention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
