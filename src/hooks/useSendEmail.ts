import { useState } from "react";

interface EmailPayload {
  name: string; 
  email: string;   
  message: string; 
  service: string; 
    date: string;
    time: string;
}

interface UseSendEmailResult {
  sendEmail: (data: EmailPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useSendEmail = (): UseSendEmailResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (data: EmailPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setError("Faltan datos necesarios para enviar el correo.");
      console.error("Datos incompletos:", data);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),  // Enviamos 'name', 'email' y 'message'
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Error enviando el correo.");
      }

      console.log("Correo enviado correctamente");
    } catch (err: any) {
      setError(err.message);
      console.error("Error enviando correo:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};
