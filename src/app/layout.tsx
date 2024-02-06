import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tokenized Toast | AI Podcast Generator",
  description: "AI Podcast Generator",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={inter.className}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
