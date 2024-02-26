import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import getImagesApi from 'services/galleryApi';
import * as Notify from 'services/notifications';

import Section from './Section/Section';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGalleryList from './ImageGalleryList/ImageGalleryList';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const imagesPerPage = 12;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);
        setError('');

        const response = await getImagesApi(searchQuery, page, imagesPerPage);

        if (response.hits.length > 0 && response.hits.length < imagesPerPage) {
          Notify.NotificationInfo(Notify.INFO_MESSAGE);
        }

        if (!response.hits.length) {
          Notify.NotificationError(Notify.NO_FOUND_MESSAGE);
        }

        setImages(prevImages => [...prevImages, ...response.hits]);
        setIsLoading(false);
        setError('');
        setShowLoadMore(page < Math.ceil(response.total / imagesPerPage));
      } catch (error) {
        Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQueryText => {
    if (error) {
    }
    if (searchQuery === searchQueryText) {
      Notify.NotificationInfo(Notify.ALREADY_SHOWN_MESSAGE);
      return;
    }

    setSearchQuery(searchQueryText);
    setImages([]);
    setPage(1);
  };

  const handleOnClickLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onModalOpen = image => {
    setModalImage(image);
    setShowModal(!showModal);
  };

  const onModaClose = () => {
    setShowModal(false);
  };

  return (
    <Section>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGalleryList
        images={images}
        onModalOpen={onModalOpen}
        imagesPerPage={imagesPerPage}
      />
      {isLoading && <Loader />}
      {showLoadMore && <Button onClick={handleOnClickLoadMoreBtn} />}
      {showModal && (
        <Modal onModalClose={onModaClose}>
          <img src={modalImage.largeImageURL} alt={modalImage.tags} />
        </Modal>
      )}
      <ToastContainer />
    </Section>
  );
};

export default App;
