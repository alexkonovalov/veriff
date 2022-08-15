import { isDisabled } from "@testing-library/user-event/dist/utils";
import ToggleButton from "../ToggleButton/ToggleButton";
import styles from "./CheckToggle.module.scss";

export type CheckToggleProps = {
    description: string;
    isDisabled?: boolean;
};

const CheckToggle = ({ description, isDisabled }: CheckToggleProps) => {
    return (
        <div className={styles.Check}>
            <div data-testid="check-description" className={styles.description}>
                {description}
                <ToggleButton
                    isYes={false}
                    isDisabled={isDisabled}
                    onYesClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    onNoClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
        </div>
    );
};

export default CheckToggle;
