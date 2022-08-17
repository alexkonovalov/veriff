import styles from "./Success.module.scss";

export const Success = () => {
    return (
        <>
            <div className={styles.Tick}></div>
            <div>Congrats! Your form has been submitted!</div>
        </>
    );
};
