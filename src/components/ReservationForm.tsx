"use client";

import { useEffect, useRef, useState } from "react";
import { useBlockedDates } from "@/hooks/useBlockedDates";
import { useReservations } from "@/hooks/useReservations";
import { useForm, SubmitHandler } from "react-hook-form";
import { Calendar } from "@/components/ui/Calendar";
import { Clock, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

interface Reservation {
  id: number;
  date: string;
  time: string;
}

const ReservationForm = () => {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<IFormInput>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const blockedDates = useBlockedDates();
  const selectedDate = watch("date");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<IFormInput | null>(null);
  const blockedTimes = useReservations(selectedDate);

  const services = [
    { name: "Lavado y Peinado" },
    { name: "Color de mujer" },
    { name: "Tinte raíz y Lavado" },
    { name: "Mechas balayage y lavado" },
    { name: "Maquillaje" },
    { name: "Corte caballero" },
  ];

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirmedSubmit = async () => {
    if (!formData) return;

    const dataWithStatus = { ...formData, status: "pendiente" };

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
        toast.success("Reserva realizada con éxito");
        reset();
        setCalendarOpen(false);
      } else {
        console.error("Error al realizar la reserva:", result.error);
        toast.error("Error al realizar la reserva");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al procesar la solicitud");
    }

    setIsConfirmOpen(false);
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
    <div>
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
                    <label className="text-sm font-medium">
                      Nombre completo
                    </label>
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
                    <Select
                      onValueChange={(value) => setValue("service", value)}
                    >
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
                            left: "-5%",
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
                            blockedDates={blockedDates}
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
                            .padStart(2, "0")}:30:00`;
                          const isBlocked = blockedTimes.includes(startTime);
                          return (
                            <option
                              key={startTime}
                              value={startTime}
                              disabled={isBlocked}
                            >
                              {startTime.slice(0, -3)}{" "}
                              {isBlocked ? "(No disponible)" : ""}
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
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar reserva</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas realizar esta reserva?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedSubmit}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReservationForm;
