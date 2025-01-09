"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" passHref>
          <Image
            src="/Lorena Varona Logo.png"
            alt="Lorena Varona"
            width={70}
            height={50}
            className="custom-class"
          />
        </Link>
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
            <Link href="/" className="text-white transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/#galeria" className="transition-colors">
              Galería
            </Link>
          </li>
          <li>
            <Link href="/#reserva" className="transition-colors">
              Reserva
            </Link>
          </li>
          <li>
            <Link href="/blog" className="transition-colors">
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
            <ul className="flex flex-col py-2">
              <li>
                <Link
                  href="/inicio"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/#galeria"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/#reserva"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Reserva
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-black hover:bg-gray-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
