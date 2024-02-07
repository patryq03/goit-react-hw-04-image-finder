import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={css.imageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
