import styles from "./Button.module.scss";

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button = ({ className, ...rest }: ButtonProps) => (
    <button className={`${className} ${styles.Button}`} {...rest} />
);
