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
  
  const [ images, setImages] = useState([]);
  const [ isLoading, setIsLoading] = useState(false);
  const [ error, setError] = useState(null);  
  const [ activePage, setActivePage] = useState(1);
  const [ searchQuery, setSearchQuery] = useState('');
  const [ totalImages, setTotalImages ] = useState(0);
  const [ modalIsOpen , setModalIsOpen ] = useState(false);
  const [ largeImageURL, setLargeImageURL ] = useState([]);

  searchImages = query => {
    if (query.trim() === '') {
      Notiflix.Notify.info('Sorry, please provide a search word');
      return;
    }
    setImages([]);
    setActivePage(0);
    setSearchQuery(`${Date.now()}/${query}`);
  };

  loadMoreImages = () => {
    setActivePage(prev => ( prev + 1 ));
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.activePage;
    const nexPage = this.state.activePage;

    if (prevQuery !== nextQuery || prevPage !== nexPage) {
      this.getImages();
    }
  };

  showLoadMore = () => {
    if (images.length > 0 && totalImages - perPage * activePage > 0) {
      return true;
    }
  };

  showModal = largeImageUrl => {
    setModalIsOpen(true);
    setLargeImageURL(largeImageUrl);
  };

  closeModal = () => {
    setModalIsOpen(false);
  };

  handleClickModal = evt => {
    if (evt.target.nodeName !== 'IMG') {
      this.closeModal();
    }
  };

  handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      this.closeModal();
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', this.handleKeyDown);
    return () => {
      window.removeEventListener('keydown', this.handleKeyDown);
    };
  }, []);
  

  getImages = async () => {
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
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalImages: data.total,
      }));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


    return (
      <div>
        <Searchbar onSubmit={this.searchImages} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              prewImgUrl={image.webformatURL}
              largeImgUrl={image.largeImageURL}
              tags={image.tags}
              handleClick={this.showModal}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {error && <p>Sth went wrong...{error.message}</p>}
        {this.showLoadMore() > 0 && (
          <Button handleClick={this.loadMoreImages} />
        )}
        {modalIsOpen && (
          <Modal src={largeImageUrl} handleClick={this.handleClickModal} />
        )}
      </div>
    );
  }
