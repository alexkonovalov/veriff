import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ children, ...rest }: any) => {
    return (
        <button className="Button" {...rest}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
