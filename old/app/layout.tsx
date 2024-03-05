import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tokenized Toast | AI Podcast Generator",
  description: "AI Podcast Generator",
};

// Create a root layout component to encapsulate the <html> and <body> tags
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Navbar />
          <AuthProvider>
            <main className={inter.className}>{children}</main>
          </AuthProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
