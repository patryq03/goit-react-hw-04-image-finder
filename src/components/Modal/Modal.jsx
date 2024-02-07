import css from './Modal.module.css';
import propTypes from 'prop-types';

const Modal = ({ handleClick, src }) => {
  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClick: propTypes.func.isRequired,
  src: propTypes.string.isRequired,
};
export default Modal;
