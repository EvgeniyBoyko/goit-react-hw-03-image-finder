import React from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClickModal={openModal} />
        ))}
      </ul>
    </>
  );
};

ImageGallery.defaultProps = {
  image: "https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product+image+placeholder"
};

ImageGallery.propTypes = {
  onClickModal: PropTypes.func,
};

export default ImageGallery;