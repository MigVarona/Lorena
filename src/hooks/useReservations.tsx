import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useReservations = (selectedDate: string | undefined) => {
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchReservations() {
      if (!selectedDate) return;

      try {
        const response = await fetch("/api/reservas");
        const { data } = await response.json();

        const reservationsForDate = data.filter(
          (reservation: { date: string }) => reservation.date === selectedDate
        );

        const times = reservationsForDate.map(
          (reservation: { time: string }) => reservation.time
        );
        setBlockedTimes(times);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
        toast.error("Error al cargar los horarios disponibles");
      }
    }

    fetchReservations();
  }, [selectedDate]);

  return blockedTimes;
};
