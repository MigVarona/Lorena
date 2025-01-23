import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  active: boolean
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    if (active) {
      document.addEventListener("mousedown", listener);
    } else {
      document.removeEventListener("mousedown", listener);
    }

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, active]);
};
