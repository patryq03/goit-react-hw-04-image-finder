import propTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ handleClick }) => {
  return (
    <div className={css.div}>
      <button className={css.button} onClick={handleClick}>
        Load More
      </button>
    </div>
  );
};
export default Button;

Button.propTypes = {
  handleClick: propTypes.func.isRequired,
};
