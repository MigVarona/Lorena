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

// Mantén los cambios sugeridos en tu código actual

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
            src="/pexels-heyho-7195802.jpg"
            alt="Peluquería de mujeres"
            className="object-cover w-full h-full"
            style={{ opacity: 0.7 }}
          />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenida a Belleza Única
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
    </div>
  );
}
