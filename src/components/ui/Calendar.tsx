import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  selected?: Date[];
  onSelect: (date: Date) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selected = [],
  onSelect,
  className = "",
}) => {
  const isSelected = (date: Date) =>
    selected.some((selectedDate) => selectedDate.getTime() === date.getTime());

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${className}`}>
      <DayPicker
        mode="multiple"
        selected={selected}
        onSelect={(dates) => {
          if (!dates) return;
          if (Array.isArray(dates)) {
            // Manejo de múltiples fechas
            const [lastSelected] = dates.slice(-1);
            onSelect(lastSelected);
          } else {
            onSelect(dates);
          }
        }}
        modifiers={{
          selected: isSelected,
        }}
        modifiersClassNames={{
          selected: "bg-blue-500 text-white",
        }}
      />
    </div>
  );
};
