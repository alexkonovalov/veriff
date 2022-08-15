import ToggleButton from "../ToggleButton/ToggleButton";
import styles from "./Check.module.scss";

export type CheckProps = {
    description: string;
};

const Check = ({ description }: CheckProps) => {
    return (
        <>
            <div data-testid="check-description" className={styles.description}>
                {description}
                <ToggleButton
                    isYes={false}
                    onYesClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    onNoClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
        </>
    );
};

export default Check;
