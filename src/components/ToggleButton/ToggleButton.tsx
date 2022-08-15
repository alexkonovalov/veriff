import styles from "./ToggleButton.module.scss";

type ButtonProps = {
    isDisabled?: boolean;
    isYes: boolean;
    onYesClick: () => void;
    onNoClick: () => void;
};

const ToggleButton = ({
    onYesClick,
    onNoClick,
    isYes,
    isDisabled,
}: ButtonProps) => {
    return (
        <div className={styles.Toggle}>
            <button
                type="button"
                className={isYes ? styles.selected : undefined}
                onClick={() => onYesClick()}
                disabled={isDisabled}
            >
                Yes
            </button>
            <button
                type="button"
                className={!isYes ? styles.selected : undefined}
                onClick={() => onNoClick()}
                disabled={isDisabled}
            >
                No
            </button>
        </div>
    );
};

export default ToggleButton;
