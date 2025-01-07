import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Añadir id a las props
interface EditReservationDialogProps {
  reservation: { id: string; date: string; time: string }; // Añadir id
  onClose: () => void;
  onSave: (id: string, date: string, time: string) => void; // Incluir id en onSave
}

export const EditReservationDialog: React.FC<EditReservationDialogProps> = ({
  reservation,
  onClose,
  onSave,
}) => {
  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);

  const handleSave = () => {
    onSave(reservation.id, date, time); // Pasar id junto con date y time
    onClose(); // Cerrar el diálogo
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Reserva</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Fecha
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium">
              Hora
            </label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={handleSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
