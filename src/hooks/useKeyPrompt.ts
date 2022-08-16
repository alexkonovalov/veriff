import { useCallback, useState } from "react";
import { useKeydown } from "./useKeydown";

function useKeyPrompt({
    yesKey,
    noKey,
    updateCallback,
}: {
    yesKey: string;
    noKey: string;
    updateCallback: (isYes: boolean) => void;
}) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === yesKey) {
                e.preventDefault();
                updateCallback(true);
            } else if (e.key === noKey) {
                e.preventDefault();
                updateCallback(false);
            }
        },
        [updateCallback, yesKey, noKey]
    );

    useKeydown(handleKeyDown);
}

export default useKeyPrompt;
