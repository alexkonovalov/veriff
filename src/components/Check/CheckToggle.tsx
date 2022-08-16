import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useCallback } from "react";
import ToggleButton from "../ToggleButton/ToggleButton";
import styles from "./CheckToggle.module.scss";

export type CheckToggleProps = {
    description: string;
    isYes: boolean;
    onCheck: (isYes: boolean) => void;
    isDisabled?: boolean;
};

const CheckToggle = ({
    description,
    isDisabled,
    isYes,
    onCheck: onCheck,
}: CheckToggleProps) => {
    const onYes = useCallback(() => onCheck(true), []);
    const onNo = useCallback(() => onCheck(false), []);
    return (
        <div className={styles.Check}>
            <div data-testid="check-description" className={styles.description}>
                {description}
                <ToggleButton
                    isYes={isYes}
                    isDisabled={isDisabled}
                    onYesClick={onYes}
                    onNoClick={onNo}
                />
            </div>
        </div>
    );
};

export default CheckToggle;
