import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  className = "",
}) => {
  const isDisabled = (date: Date) => {
    const day = date.getDay();
    return day === 6 || day === 0; // 0 = Domingo, 1 = Lunes
  };
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${className}`}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (!date || isDisabled(date)) return; // Ignorar fechas deshabilitadas
          onSelect(date);
        }}
        modifiers={{
          disabled: isDisabled, // Aquí aplicamos la lógica para días deshabilitados
        }}
        modifiersClassNames={{
          disabled: "text-gray-400 cursor-not-allowed",
          selected: "bg-blue-500 text-white",
        }}
        
      />
    </div>
  );
};
