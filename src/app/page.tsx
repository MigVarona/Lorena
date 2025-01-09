"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ReservationForm from "../components/ReservationForm";
import Gallery from "../components/Gallery";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import Image from "next/image";
import PricingSection from "../components/PricingSection";
import SobreMi from "../components/SobreMi";
import InstagramGallery from "../components/InstagramGallery";
import Navbar from "@/components/Navbar";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Navbar />

      {/* Other sections */}
      <section
        id="inicio"
        className="relative bg-black text-white h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            width={1200}
            height={400}
            src="/Lorena Varona Salon.jpeg"
            alt="Peluquería de mujeres"
            className="object-cover w-full h-full"
            style={{ opacity: 0.7 }}
          />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenida a Lorena Varona
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            El estilo que siempre soñaste, ahora al alcance de tus manos.
            Descubre la mejor versión de ti misma.
          </p>
          <a
            href="#reserva"
            className="bg-primary text-white py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Reserva tu cita
          </a>
        </div>
      </section>
      <SobreMi />
      <Gallery />
      <PricingSection />
      <BlogSection />
      <div id="reserva">
        <ReservationForm />
      </div>
      <InstagramGallery />

      <Footer />
      <a
        href="https://wa.me/34685898088" // Reemplaza con tu número de WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
        style={{ zIndex: 9999 }} // Asegura que el ícono se muestre encima de otros elementos
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
}
