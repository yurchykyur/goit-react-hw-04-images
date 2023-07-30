import { useState } from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export default function ImageGalleryItem(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    galleryItem: { webformatURL, largeImageURL, tags },
  } = props;
  return (
    <>
      <GalleryItem className="gallery-item" onClick={toggleModal}>
        <GalleryImg src={webformatURL} alt={tags} />
      </GalleryItem>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          onCloseModal={() => toggleModal()}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
