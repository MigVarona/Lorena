import { useState, useEffect } from "react";

export const useServices = () => {
  const [services, setServices] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchedServices = [
      { name: "Lavado y Peinado" },
      { name: "Color de mujer" },
      { name: "Tinte raíz y Lavado" },
      { name: "Mechas balayage y lavado" },
      { name: "Maquillaje" },
      { name: "Corte caballero" },
    ];
    setServices(fetchedServices);
  }, []);

  return { services };
};
