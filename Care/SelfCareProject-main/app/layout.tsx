import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css"; // Assure-toi que le chemin est correct
import NavbarWrapper from "./components/NavbarWrapper";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SelfCare App",
  description: "Votre application de santé personnelle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
