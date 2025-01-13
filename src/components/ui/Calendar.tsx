import React from "react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";

import "react-day-picker/dist/style.css";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  className?: string;
  blockedDates?: string[]; // Propiedad para pasar fechas bloqueadas
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  blockedDates = [],
}) => {
  // Convierte las fechas bloqueadas en objetos Date
  const blockedDatesSet = new Set(
    blockedDates.map((date) => new Date(date).toDateString())
  );

  const isDisabled = (date: Date) => {
    const day = date.getDay();
    return day === 1 || day === 0 || blockedDatesSet.has(date.toDateString());
  };

  return (
    <div>
      <DayPicker
        locale={es}
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (!date || isDisabled(date)) return;
          onSelect(date);
        }}
        modifiers={{
          disabled: isDisabled, // Lógica para deshabilitar días
        }}
      />
    </div>
  );
};
