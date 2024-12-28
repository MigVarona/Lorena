'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { FaPhoneAlt, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

// Define el tipo de los datos del formulario
interface IFormInput {
  name: string;
  email: string;
  date: string;
  message: string;
  service: string;  // Para almacenar el servicio elegido

}

export default function Home() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const services = [
    { name: 'Corte de Cabello', price: '€25' },
    { name: 'Color de Cabello', price: '€40' },
    { name: 'Tratamientos Capilares', price: '€30' },
  ];

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="font-sans text-black">
      {/* Navbar */}
      <nav className="bg-white text-black p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Belleza Única</h1>
          <ul className="flex gap-6">
            <li><a href="#inicio" className="hover:underline">Inicio</a></li>
            <li><a href="#reserva" className="hover:underline">Reserva</a></li>
            <li><a href="#servicios" className="hover:underline">Servicios</a></li>
            <li><a href="#horarios" className="hover:underline">Horarios</a></li>
          </ul>
        </div>
      </nav>

      {/* Sección de Hero */}
      <section id="inicio" className="relative w-full h-screen bg-black text-white flex items-center justify-center">
        <Image
          src="/peluqueria.jpg"
          alt="Peluquería de mujeres"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 object-cover opacity-60"
        />
        <div className="relative z-10 text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Bienvenida a Belleza Única</h2>
          <p className="text-lg mb-6">El estilo que siempre soñaste, ahora al alcance de tus manos.</p>
          <a href="#reserva" className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition">Reserva tu cita</a>
        </div>
      </section>

            {/* Sección de Fotos de Ejemplo */}
            <section id="fotos" className="bg-white p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Mira Algunos de Nuestros Trabajos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full h-64 bg-gray-200 relative">
            <Image
              src="/ejemplo1.jpg"
              alt="Ejemplo de corte de cabello"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full h-64 bg-gray-200 relative">
            <Image
              src="/ejemplo2.jpg"
              alt="Ejemplo de color de cabello"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full h-64 bg-gray-200 relative">
            <Image
              src="/ejemplo3.jpg"
              alt="Ejemplo de tratamiento capilar"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>


      {/* Sección de Reserva */}
      <section id="reserva" className="min-h-screen bg-white p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Reserva tu cita ahora</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-md mx-auto">
          {/* Campo de teléfono */}
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="h-5 w-5 text-black" />
            <input
              type="tel"
              placeholder="Número de teléfono"
              {...register("name")}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          {/* Campo de correo electrónico */}
          <div className="flex items-center space-x-2">
            <FaEnvelope className="h-5 w-5 text-black" />
            <input
              type="email"
              placeholder="Correo Electrónico"
              {...register("email")}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          {/* Campo de fecha */}
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="h-5 w-5 text-black" />
            <input
              type="date"
              {...register("date")}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Campo de selección de servicio */}
          <div className="flex flex-col gap-2">
            <label htmlFor="service" className="text-lg font-semibold">Elige tu Servicio</label>
            <select
              id="service"
              {...register("service")}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Selecciona un servicio</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} - {service.price}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de comentarios adicionales */}
          <textarea
            placeholder="Comentarios adicionales"
            {...register("message")}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          
          {/* Botón de enviar */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Reservar
          </button>
        </form>
      </section>

      

      {/* Sección de Servicios y Precios */}
      <section id="servicios" className="bg-gray-50 p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Corte de Cabello</h3>
            <p className="mb-4">El corte de cabello más moderno y personalizado para ti.</p>
            <p className="text-lg font-bold">€25</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Color de Cabello</h3>
            <p className="mb-4">Dale vida a tu cabello con nuestros colores profesionales.</p>
            <p className="text-lg font-bold">€40</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Tratamientos Capilares</h3>
            <p className="mb-4">Recupera la salud de tu cabello con nuestros tratamientos exclusivos.</p>
            <p className="text-lg font-bold">€30</p>
          </div>
        </div>
      </section>


      {/* Sección de Horarios */}
      <section id="horarios" className="min-h-screen bg-white p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Nuestros Horarios</h2>
        <div className="max-w-3xl mx-auto text-center">
          <ul className="space-y-4">
            <li className="flex justify-between text-lg">
              <span>Lunes</span> <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Martes</span> <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Miércoles</span> <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Jueves</span> <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Viernes</span> <span>9:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Sábado</span> <span>10:00 AM - 4:00 PM</span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Domingo</span> <span>Cerrado</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black text-center p-4 border-t border-gray-300">
        <p>© {new Date().getFullYear()} Belleza Única. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
