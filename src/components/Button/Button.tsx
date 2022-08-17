import styles from "./Button.module.scss";

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = ({ className, ...rest }: ButtonProps) => (
    <button className={`${className} ${styles.Button}`} {...rest} />
);

export default Button;
