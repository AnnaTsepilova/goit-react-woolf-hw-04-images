import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import css from './ImageGalleryList.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGalleryList = ({ images, onModalOpen, imagesPerPage }) => {
  useEffect(() => {
    if (images.length > imagesPerPage) {
      scroll.scrollToBottom();
    } else {
      scroll.scrollToTop();
    }
  }, [images.length, imagesPerPage]);

  return (
    <ul className={css.imageGalleryContainer}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          img={image}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  );
};

export default ImageGalleryList;
