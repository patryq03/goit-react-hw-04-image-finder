import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '41316122-8be1516af8b9dd89b7470b6b1';
const perPage = 12;

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState([]);

  const searchImages = query => {
    if (query.trim() === '') {
      Notiflix.Notify.info('Sorry, please provide a search word');
      return;
    }
    setImages([]);
    setActivePage(0);
    setSearchQuery(`${Date.now()}/${query}`);
  };

  const loadMoreImages = () => {
    setActivePage(prev => prev + 1);
  };

  const showLoadMore = () => {
    if (images.length > 0 && totalImages - perPage * activePage > 0) {
      return true;
    }
  };

  const showModal = largeImageURL => {
    setModalIsOpen(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClickModal = evt => {
    if (evt.target.nodeName !== 'IMG') {
      closeModal();
    }
  };

  const handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getImages();
    }
    // eslint-disable-next-line
  }, [searchQuery, activePage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  const getImages = async () => {
    setIsLoading(true);
    const separated = searchQuery.split('/');
    const exstractedQuery = separated[1];
    try {
      const { data } = await axios({
        params: {
          q: exstractedQuery,
          page: activePage,
          key: apiKey,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: perPage,
        },
      });
      if (data.total === 0) {
        Notiflix.Notify.warning(`
I couldn't find any images`);
      }
      setImages(prev => [...prev, ...data.hits]);
      setTotalImages(data.total);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={searchImages} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            prewImgUrl={image.webformatURL}
            largeImgUrl={image.largeImageURL}
            tags={image.tags}
            handleClick={showModal}
          />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {error && <p>Sth went wrong...{error.message}</p>}
      {showLoadMore() > 0 && <Button handleClick={loadMoreImages} />}
      {modalIsOpen && (
        <Modal src={largeImageURL} handleClick={handleClickModal} />
      )}
    </div>
  );
}
