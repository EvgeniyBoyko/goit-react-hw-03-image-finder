import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import Button from '../Button';
import Modal from '../Modal';
import { fetchImages } from '../services/gallery-services';
import LoaderElem from '../Loader';
import Loader from "react-loader-spinner";

class Gallery extends Component {
    state = {
        images: [],
        page: 1,
        query: '',
        isLoading: false,
        error: null,
        isModalOpen: false,
        largeImg: "",
    };

    listRef = createRef();

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.images.length < this.state.images.length) {
        const { current } = this.listRef;
        return current.scrollHeight
        };
        return null
    };
  
     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.query !== this.state.query) {
        this.fetchGallery();
        };
        
        if (snapshot !== null) {
            window.scrollTo({
                top: snapshot,
                behavior: 'smooth',
            });
        };
    };
  
  
    onChangeQuery = (query) => {
        this.setState({
            images: [],
            query: query,
            page: 1,
            error: null,
        });
    };
  
    fetchGallery = () => {
        const { page, query } = this.state;

        this.setState({
            isLoading: true
        });

        const imagesRequest = fetchImages(query, page);
 
        imagesRequest
            .then(response => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...response.data.hits],
                    page: prevState.page + 1,
                }));
            }).catch(error => this.setState({
                error
            }))
            .finally(() => this.setState({
                isLoading: false
            }));
    };

    toggleModal = (Img = "") => {
        this.setState(({ isModalOpen }) => ({
            isModalOpen: !isModalOpen,
            largeImg: Img
        }));
    };

  render() {
      const { images, isLoading, isModalOpen, largeImg } = this.state;
      const { onChangeQuery, toggleModal, listRef, fetchGallery } = this;
      return (
          <>

              <Searchbar onSubmit={onChangeQuery} />
              {isLoading && <LoaderElem />}
              <div ref={listRef}>
                  <ImageGallery images={images} openModal={toggleModal} />
                  {isLoading && <h3>Loading...</h3>}
              </div>

              {images.length > 0 && <Button fetchGallery={fetchGallery} />}

              {isModalOpen && <Modal onClose={toggleModal}>
                  <img src={largeImg} alt="" />
              </Modal>}

          </>);
    };
};



export default Gallery;