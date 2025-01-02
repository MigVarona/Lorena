"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
            <a href="/" className="text-white transition-colors">
              Inicio
            </a>
          </li>
          <li>
            <a href="/#galeria" className="transition-colors">
              Galería
            </a>
          </li>
          <li>
            <a href="/#reserva" className="transition-colors">
              Reserva
            </a>
          </li>
          <li>
            <a href="/blog" className="transition-colors">
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
                  href="/inicio"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/#galeria"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="/#reserva"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Reserva
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
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
  );
}
