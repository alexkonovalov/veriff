import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useCallback, useEffect, useRef } from "react";
import ToggleButton from "../ToggleButton/ToggleButton";
import styles from "./CheckToggle.module.scss";

export type CheckToggleProps = {
    description: string;
    isYes: boolean;
    onCheck: (isYes: boolean) => void;
    isDisabled?: boolean;
    isSelected?: boolean;
    tabIx: number;
};

const CheckToggle = ({
    description,
    isDisabled,
    isSelected,
    isYes,
    onCheck: onCheck,
    tabIx,
}: CheckToggleProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        isSelected && ref?.current?.focus();
    }, [isSelected]);

    const onYes = useCallback(() => onCheck(true), []);
    const onNo = useCallback(() => onCheck(false), []);
    return (
        <div className={styles.Check} tabIndex={tabIx} ref={ref}>
            {description}
            <ToggleButton
                isYes={isYes}
                isDisabled={isDisabled}
                onYesClick={onYes}
                onNoClick={onNo}
            />
        </div>
    );
};

export default CheckToggle;
