import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Local Imports
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import SignInModal from "@/components/modals/SignInModal";
import SearchModal from "@/components/modals/SearchModal";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ByteBlog",
  description: "ByteBlog for tech related articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased bg-background overflow-x-hidden`}
      >
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <SignInModal />
          <SearchModal />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
