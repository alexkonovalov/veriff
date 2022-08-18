import { useCallback, useEffect, useRef } from "react";
import { ButtonStatusEnum } from "../../model";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import styles from "./CheckToggle.module.scss";

export type CheckToggleProps = {
    description: string;
    onCheckIx: (ix: number) => void;
    onUncheckIx: (ix: number) => void;
    isDisabled?: boolean;
    isSelected?: boolean;
    status: ButtonStatusEnum;
    tabIx: number;
    ix: number;
};

const CheckToggle = ({
    description,
    isDisabled,
    isSelected,
    onCheckIx,
    onUncheckIx,
    status,
    tabIx,
    ix,
}: CheckToggleProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        isSelected && ref?.current?.focus();
    }, [isSelected]);

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
        >
            <div className={styles.Description}>{description}</div>
            <ToggleButton
                status={status}
                isDisabled={isDisabled}
                onYesClick={onYes}
                onNoClick={onNo}
            />
        </div>
    );
};

export default CheckToggle;
