import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ prewImgUrl, largeImgUrl, tags, handleClick }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => handleClick(largeImgUrl)}
    >
      <img src={prewImgUrl} alt={tags} className={css.imageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  prewImgUrl: PropTypes.string.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
