import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peluquería exclusiva en Madrid | Lorena Varona | Tendencia en tu pelo",
  description: "Peluquería exclusiva en Madrid | Lorena Varona | Tendencia en tu pelo",
  robots: "index, follow",  // Permite que los motores de búsqueda indexen el sitio y sigan los enlaces
  keywords: "peluquería, Madrid, cortes de pelo, estilo, tendencia, peluquería exclusiva, Lorena Varona", // Agrega palabras clave relevantes para el SEO
  openGraph: {
    title: "Peluquería exclusiva en Madrid | Lorena Varona | Tendencia en tu pelo",
    description: "Peluquería exclusiva en Madrid | Lorena Varona | Tendencia en tu pelo",
    url: "https://www.lorenavarona.com", // Cambia por la URL real de tu página
    type: "website", // El tipo de contenido
  },
  twitter: {
    card: "summary_large_image", // Tarjeta con imagen grande
    title: "Peluquería exclusiva en Madrid | Lorena Varona | Tendencia en tu pelo",
    description: "Peluquería exclusiva en Madrid | Lorena Varona | Tendencia en tu pelo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Aquí puedes colocar cualquier otra etiqueta meta que necesites */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
