import { ButtonStatusEnum } from "../../model";
import styles from "./ToggleButton.module.scss";

type ButtonProps = {
    isDisabled?: boolean;
    id: string;
    status: ButtonStatusEnum;
    onYesClick: () => void;
    onNoClick: () => void;
};

export const ToggleButton = ({
    onYesClick,
    onNoClick,
    id,
    status,
    isDisabled,
}: ButtonProps) => (
    <div className={styles.Toggle}>
        <button
            type="button"
            data-testid={`button_yes_${id}`}
            className={
                status == ButtonStatusEnum.Yes ? styles.selected : undefined
            }
            onClick={() => onYesClick()}
            disabled={isDisabled}
        >
            Yes
        </button>
        <button
            type="button"
            data-testid={`button_no_${id}`}
            className={
                status == ButtonStatusEnum.No ? styles.selected : undefined
            }
            onClick={() => onNoClick()}
            disabled={isDisabled}
        >
            No
        </button>
    </div>
);
