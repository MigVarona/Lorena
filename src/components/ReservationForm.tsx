"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  FaUser,
  FaPhoneAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

// Define el tipo de los datos del formulario
interface IFormInput {
  phone: string;
  name: string;
  email: string;
  date: string;
  time: string; // Nuevo campo para el horario
  message: string;
  service: string;
  status: string; // Cambiado a string para manejar dinámicamente
}

const ReservationForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const services = [
    { name: "Corte de Cabello", price: "€25" },
    { name: "Color de Cabello", price: "€40" },
    { name: "Tratamientos Capilares", price: "€30" },
  ];

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const dataWithStatus = {
      ...data,
      status: "pendiente", // Agregar estado predeterminado
    };

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithStatus),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Reserva realizada con éxito:", result);
      } else {
        console.error("Error al realizar la reserva:", result.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <section id="reserva" className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Reserva tu cita ahora
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-md mx-auto"
      >
        {/* Campo de nombre */}
        <div className="flex items-center space-x-2">
          <FaUser className="h-5 w-5 text-black" />
          <input
            type="text"
            placeholder="Nombre y Apellido"
            {...register("name")}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {/* Campo de teléfono */}
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="h-5 w-5 text-black" />
          <input
            type="tel"
            placeholder="Teléfono"
            {...register("phone")}
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
          <label htmlFor="service" className="text-lg font-semibold">
            Elige tu Servicio
          </label>
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
  );
};

export default ReservationForm;
