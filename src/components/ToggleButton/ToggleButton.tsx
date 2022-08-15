import styles from "./ToggleButton.module.scss";

type ButtonProps = {
    disabled?: boolean;
    isYes: boolean;
    onYesClick: () => void;
    onNoClick: () => void;
};

const ToggleButton = ({ onYesClick, onNoClick, isYes }: ButtonProps) => {
    return (
        <div className={styles.Toggle}>
            <button
                type="button"
                className={isYes ? styles.selected : undefined}
                onClick={() => onYesClick()}
            >
                Yes
            </button>
            <button
                type="button"
                className={!isYes ? styles.selected : undefined}
                onClick={() => onNoClick()}
            >
                No
            </button>
        </div>
    );
};

export default ToggleButton;
