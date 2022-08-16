import { useCallback, useState, useEffect } from "react";
import { useKeydown } from "./useKeydown";

function useRoveFocus(
    size: number,
    isLimit: boolean,
    onDown?: () => void,
    onUp?: () => void
) {
    const [currentFocus, setCurrentFocus] = useState<number>(0);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (isLimit) {
                    return;
                }

                onDown && onDown();
                currentFocus !== size - 1 && setCurrentFocus(currentFocus + 1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                onUp && onUp();
                currentFocus !== 0 && setCurrentFocus(currentFocus - 1);
            }
        },
        [size, currentFocus, setCurrentFocus, isLimit]
    );

    useKeydown(handleKeyDown);

    return { currentFocus, setCurrentFocus };
}

export default useRoveFocus;
