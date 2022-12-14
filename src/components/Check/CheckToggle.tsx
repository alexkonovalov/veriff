import { useCallback, useEffect, useRef } from "react";
import { ButtonStatusEnum } from "../../model";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import styles from "./CheckToggle.module.scss";

export type CheckToggleProps = {
    description: string;
    id: string;
    onCheckIx: (ix: number) => void;
    onUncheckIx: (ix: number) => void;
    isDisabled?: boolean;
    isFocused?: boolean;
    status: ButtonStatusEnum;
    tabIx: number;
    ix: number;
};

export const CheckToggle = ({
    description,
    id,
    isDisabled,
    isFocused,
    onCheckIx,
    onUncheckIx,
    status,
    tabIx,
    ix,
}: CheckToggleProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        isFocused && ref?.current?.focus();
    }, [isFocused]);

    const onYes = useCallback(() => {
        onCheckIx(ix);
    }, [onCheckIx, ix]);

    const onNo = useCallback(() => {
        onUncheckIx(ix);
    }, [onUncheckIx, ix]);

    return (
        <div
            className={`${styles.Check} ${isDisabled ? styles.Disabled : ""}`}
            tabIndex={tabIx}
            ref={ref}
            data-testid={`check_${id}`}
        >
            <div className={styles.Description}>{description}</div>
            <ToggleButton
                status={status}
                id={id}
                isDisabled={isDisabled}
                onYesClick={onYes}
                onNoClick={onNo}
            />
        </div>
    );
};
