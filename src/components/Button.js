import PropTypes from 'prop-types';

const Button = ({ text, color, onClick }) => {
    return (
        <button className='btn'style={{ backgroundColor: color }} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onclick: PropTypes.func,

}

export default Button;