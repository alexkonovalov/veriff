import { ButtonStatusEnum } from "../../model";
import styles from "./ToggleButton.module.scss";

type ButtonProps = {
    isDisabled?: boolean;
    status: ButtonStatusEnum;
    onYesClick: () => void;
    onNoClick: () => void;
};

export const ToggleButton = ({
    onYesClick,
    onNoClick,
    status,
    isDisabled,
}: ButtonProps) => (
    <div className={styles.Toggle}>
        <button
            type="button"
            className={
                status == ButtonStatusEnum.yes ? styles.selected : undefined
            }
            onClick={() => onYesClick()}
            disabled={isDisabled}
        >
            Yes
        </button>
        <button
            type="button"
            className={
                status == ButtonStatusEnum.no ? styles.selected : undefined
            }
            onClick={() => onNoClick()}
            disabled={isDisabled}
        >
            No
        </button>
    </div>
);
