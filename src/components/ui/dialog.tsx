import React, { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils"; // Si usas una función de utilidades para combinar clases

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </DialogPrimitive.Root>
);

export const DialogTrigger: React.FC<{ children: ReactNode }> = ({ children }) => (
  <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
);

export const DialogContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <DialogPrimitive.Portal>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <DialogPrimitive.Content
        className={cn(
          "bg-white p-6 rounded-md shadow-lg",
          "w-full max-w-md transform transition-all"
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </div>
  </DialogPrimitive.Portal>
);

export const DialogHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <header className="mb-4">{children}</header>
);

export const DialogFooter: React.FC<{ children: ReactNode }> = ({ children }) => (
  <footer className="flex justify-end space-x-2">{children}</footer>
);

// Aquí añadimos el DialogTitle
export const DialogTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <DialogPrimitive.Title className="text-xl font-semibold">{children}</DialogPrimitive.Title>
);
