import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "SRMlive — The Campus, Live.",
  description:
    "Every event happening on campus, in one place. Discover, RSVP, and never miss what's live at SRM.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
