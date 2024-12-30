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

// Mantén los cambios sugeridos en tu código actual

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-black text-white p-4 shadow-md fixed w-full z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Lorena Varona</h1>

          {/* Hamburger menu button for mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-6">
            <li>
              <a href="#inicio" className="text-black transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="#galeria" className="transition-colors">
                Galería
              </a>
            </li>
            <li>
              <a href="#reserva" className="transition-colors">
                Reserva
              </a>
            </li>
            <li>
              <a href="#blog" className="transition-colors">
                Blog
              </a>
            </li>
          </ul>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
              <ul className="flex flex-col py-2">
                <li>
                  <a
                    href="#inicio"
                    className="block px-4 py-2 text-black hover:text-primary hover:bg-gray-700 transition-colors"
                    onClick={toggleMenu}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#galeria"
                    className="block px-4 py-2 text-black hover:text-primary hover:bg-gray-700 transition-colors"
                    onClick={toggleMenu}
                  >
                    Galería
                  </a>
                </li>
                <li>
                  <a
                    href="#reserva"
                    className="block px-4 py-2 text-black hover:text-primary hover:bg-gray-700 transition-colors"
                    onClick={toggleMenu}
                  >
                    Reserva
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="block px-4 py-2 text-black hover:text-primary hover:bg-gray-700 transition-colors"
                    onClick={toggleMenu}
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

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
      <InstagramGallery />
      <div id="reserva">
        <ReservationForm />
      </div>
      <Footer />
    </div>
  );
}

