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
    return day === 6 || day === 0; 
  };
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (!date || isDisabled(date)) return; 
          onSelect(date);
        }}
        modifiers={{
          disabled: isDisabled, // Aquí aplicamos la lógica para días deshabilitados
        }}
       
        
      />
    </div>
  );
};
