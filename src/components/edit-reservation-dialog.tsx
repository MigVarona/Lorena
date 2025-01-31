import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Opcional: para notificaciones

interface EditReservationDialogProps {
  reservation: { id: string; date: string; time: string };
  onClose: () => void;
  onSave: (id: string, date: string, time: string) => Promise<void>; // Cambiar a Promise
}

export const EditReservationDialog: React.FC<EditReservationDialogProps> = ({
  reservation,
  onClose,
  onSave,
}) => {
  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);
  const [isLoading, setIsLoading] = useState(false);

  // Resetear valores cuando cambia la reserva
  useEffect(() => {
    setDate(reservation.date);
    setTime(reservation.time);
  }, [reservation]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Validación básica
      if (!date || !time) {
        toast.error("Fecha y hora son requeridos");
        return;
      }

      // Formatear hora si es necesario (ej: agregar segundos)
      const formattedTime = time.includes(":") && time.length === 5 ? 
        `${time}:00` : 
        time;

      await onSave(reservation.id, date, formattedTime);
      toast.success("Reserva actualizada correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al actualizar la reserva");
      console.error("Error en handleSave:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Reserva</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Fecha
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]} // Validar fechas futuras
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Hora
            </label>
            <Input
              id="time"
              type="time"
              value={time}
              step="300" // Intervalos de 5 minutos
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="secondary" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            variant="default" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};