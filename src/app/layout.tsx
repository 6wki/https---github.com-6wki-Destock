import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import About from "@/components/about/About";
import { Suspense } from "react";
import Loading from "./loading";
import WtpButton from "@/components/whatsappButton/WtpButton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Destock",
  description:
    "Nous proposons des boissons, de la nourriture, des emballages, le tout en un seul endroit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <About />
        <WtpButton />
      </body>
    </html>
  );
}
