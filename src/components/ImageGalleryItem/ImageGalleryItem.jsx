import React from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClickModal }) => {
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
          onClick={() => onClickModal(largeImageURL)}
        />
      </li>
    </>
  );
};

ImageGalleryItem.defaultProps = {
  onClick: () => {}
};

export default ImageGalleryItem;