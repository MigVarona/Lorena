'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { FaPhoneAlt, FaCalendarAlt, FaEnvelope, FaClock } from 'react-icons/fa';

// Define el tipo de los datos del formulario
interface IFormInput {
  name: string;
  email: string;
  date: string;
  time: string; // Nuevo campo para el horario
  message: string;
  service: string; 
  status: string; // Cambiado a string para manejar dinámicamente
}

export default function Home() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const services = [
    { name: 'Corte de Cabello', price: '€25' },
    { name: 'Color de Cabello', price: '€40' },
    { name: 'Tratamientos Capilares', price: '€30' },
  ];

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const dataWithStatus = {
      ...data,
      status: "pendiente", // Agregar estado predeterminado
    };
  
    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithStatus),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Reserva realizada con éxito:', result);
      } else {
        console.error('Error al realizar la reserva:', result.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
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

          {/* Campo de hora */}
          <div className="flex items-center space-x-2">
            <FaClock className="h-5 w-5 text-black" />
            <input
              type="time"
              {...register("time")}
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
      
      {/* Footer */}
      <footer className="bg-white text-black text-center p-4 border-t border-gray-300">
        <p>© {new Date().getFullYear()} Belleza Única. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
