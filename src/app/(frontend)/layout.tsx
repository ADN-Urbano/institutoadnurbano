import type { Metadata } from "next";
import {
  Big_Shoulders,
  Archivo,
  DM_Sans,
  DM_Mono,
} from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* Sustitutos de las tipografías de pago del brandbook.
   Para cambiar a las oficiales (Fold-No.21, Basier Circle, Basier Circle Mono)
   basta con sustituir estas cargas por next/font/local apuntando a los .woff2. */
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
});
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADN Local · Centro de recursos y formación para política local",
  description:
    "Ideas, casos y formación para concejales, técnicos municipales y consultores que quieren resultados concretos en comercio, movilidad, espacio público y desarrollo local. Una iniciativa de ADN Urbano.",
  metadataBase: new URL("https://adnlocal.es"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${bigShoulders.variable} ${archivo.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
