import styles from "./Success.module.scss";

export const Success = () => {
    return (
        <>
            <div className={styles.Tick}></div>
            <div data-testid="success_screen">
                Congrats! Your form has been submitted!
            </div>
        </>
    );
};
