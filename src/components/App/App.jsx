import React, { useState, useEffect, useRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

import servicePixabayAPI from 'components/Services/PixabayAPI';

import { AppContent } from './App.styled';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [error, setError] = useState(true);

  const hitsPerPage = useRef(12);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    function fetchGalleryItems(nextQuery, nextPage, hitsPerPage) {
      setLoading(true);
      setError(false);

      servicePixabayAPI(nextQuery, nextPage, hitsPerPage.current)
        .then(data => {
          const { totalHits, hits } = data;

          if (!totalHits) {
            setLoading(false);
            setError(true);
            toast.warn(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }

          if (nextPage === 1 || totalHits <= hitsPerPage) {
            toast.success(`Hooray! We found ${totalHits} images.`);
          }

          const newData = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );

          setGalleryItems(prevState => [...prevState, ...newData]);
          setIsButtonShow(
            galleryPage < Math.ceil(totalHits / hitsPerPage.current)
          );
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
          setError(false);
        });
    }

    fetchGalleryItems(searchQuery, galleryPage, hitsPerPage);
  }, [searchQuery, galleryPage]);

  const handlerSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setGalleryPage(1);
    setGalleryItems([]);
    setIsButtonShow(false);
  };

  const onLoadMore = () => {
    setGalleryPage(prevState => prevState + 1);
  };

  return (
    <AppContent>
      <Searchbar formSubmitHandler={handlerSearchQuery}></Searchbar>

      {error && <h2>Please, enter search word!</h2>}
      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {isButtonShow && !loading && !error && <Button onClick={onLoadMore} />}

      <ToastContainer autoClose={3000} theme="dark" />
    </AppContent>
  );
}
