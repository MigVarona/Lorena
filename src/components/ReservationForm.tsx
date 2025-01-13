"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Calendar } from "@/components/ui/Calendar";
import { Clock, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IFormInput {
  phone: string;
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
  service: string;
  status: string;
}

const ReservationForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const selectedDate = watch("date");

  const services = [
    { name: "Lavado y Peinado" },
    { name: "Color de mujer" },
    { name: "Tinte raíz y Lavado" },
    { name: "Mechas balayage y lavado" },
    { name: "Maquillaje" },
    { name: "Corte caballero" },
  ];

  // Obtener fechas bloqueadas del servidor
  useEffect(() => {
    async function fetchBlockedDates() {
      try {
        const response = await fetch("/api/blocked-dates");
        const result = await response.json();

        if (response.ok) {
          const dates = result.data.map((item: { date: string }) => item.date);
          setBlockedDates(dates);
        } else {
          console.error("Error al obtener las fechas bloqueadas:", result.error);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    }

    fetchBlockedDates();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const dataWithStatus = { ...data, status: "pendiente" };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };

    if (calendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarOpen]);

  return (
    <section id="reserva" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-black">
              Reserva tu cita ahora
            </CardTitle>
            <p className="text-black">Elige el servicio perfecto para ti</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...register("name", { required: true })}
                      className="pl-10"
                      placeholder="Tu nombre y apellido"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...register("phone", { required: true })}
                      className="pl-10"
                      placeholder="Tu número de teléfono"
                      type="tel"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...register("email", { required: true })}
                      className="pl-10"
                      placeholder="Tu correo electrónico"
                      type="email"
                    />
                  </div>
                </div>

                {/* Servicio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Servicio</label>
                  <Select onValueChange={(value) => setValue("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fecha */}
                <div className="">
                  <label className="text-sm font-medium">Fecha</label>
                  <div className="relative">
                    <Input
                      {...register("date", { required: true })}
                      value={selectedDate || ""}
                      onFocus={() => setCalendarOpen(true)}
                      readOnly
                      className="cursor-pointer"
                      placeholder="Selecciona una fecha"
                    />
                    {calendarOpen && (
                      <div
                      ref={calendarRef}
                      className="absolute z-10 mt-2 bg-white shadow-lg p-4 rounded transition-transform transform"
                      style={{
                        left: "-5%", // Ajusta este valor para moverlo a la izquierda según necesites
                      }}
                    >
                        <Calendar
                          className="w-auto"
                          onSelect={(date) => {
                            setValue(
                              "date",
                              date.toLocaleDateString("en-CA")
                            );
                            setCalendarOpen(false);
                          }}
                          blockedDates={blockedDates} // Pasa las fechas bloqueadas
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hora */}
                <div>
                  <label className="text-sm font-medium">Hora</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select
                      {...register("time", { required: true })}
                      defaultValue=""
                      className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="" disabled>
                        Selecciona una hora
                      </option>
                      {Array.from({ length: 10 }).map((_, index) => {
                        const hour = 10 + index;
                        const startTime = `${hour
                          .toString()
                          .padStart(2, "0")}:30`;
                        return (
                          <option key={startTime} value={startTime}>
                            {startTime}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Comentarios adicionales */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Comentarios adicionales
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    {...register("message")}
                    className="pl-10 min-h-[100px]"
                    placeholder="¿Alguna petición especial?"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Reservar Cita
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ReservationForm;
