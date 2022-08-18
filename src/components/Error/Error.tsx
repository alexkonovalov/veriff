import styles from "./Error.module.scss";

export const Error = () => {
    return (
        <>
            <div className={styles.Cross}></div>
            <div data-testid="error_description">
                Oops! Something went wrong :(
            </div>
        </>
    );
};
