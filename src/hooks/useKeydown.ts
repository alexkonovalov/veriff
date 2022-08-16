import { useEffect } from "react";

export function useKeydown(handleKeyDown: (e: KeyboardEvent) => void) {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);
}
