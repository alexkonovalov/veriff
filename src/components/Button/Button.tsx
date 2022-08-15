import styles from "./Button.module.scss";

type ButtonProps = {
    disabled?: boolean;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
};

const Button = ({ children, onClick, ...rest }: ButtonProps) => {
    return (
        <button className={styles.Button} {...rest}>
            {children}
        </button>
    );
};

export default Button;
