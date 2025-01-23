import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useBlockedDates = () => {
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

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
          toast.error("Error al cargar las fechas bloqueadas");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    }

    fetchBlockedDates();
  }, []);

  return blockedDates;
};
