import { useCallback, useState } from "react";
import { useKeydown } from "./useKeydown";

function useRoveFocus(size: number, limitIx: number) {
    const [currentFocusIx, setCurrentFocus] = useState<number>(0);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (currentFocusIx === limitIx) {
                    return;
                }
                currentFocusIx !== size - 1 &&
                    setCurrentFocus(currentFocusIx + 1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                currentFocusIx !== 0 && setCurrentFocus(currentFocusIx - 1);
            }
        },
        [size, currentFocusIx, setCurrentFocus, limitIx]
    );

    useKeydown(handleKeyDown);

    return { currentFocusIx };
}

export default useRoveFocus;
