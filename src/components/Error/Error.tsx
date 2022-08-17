import styles from "./Error.module.scss";

export const Error = () => {
    return (
        <>
            <div className={styles.Cross}></div>
            <div>Oops! Something went wrong :(</div>
        </>
    );
};
