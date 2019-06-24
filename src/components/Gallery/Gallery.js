import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GalleryItem from '../GalleryItem/GalleryItem';
import Modal from '../Modal/Modal';
import styles from './Gallery.module.css';

class Gallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object.isRequired),
    onSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    images: [],
  };

  state = {
    largeImage: '',
    modal: false,
  };

  hadleLargeImageClick = largeImage => {
    this.setState({ largeImage, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const { images, onSearch } = this.props;
    const { largeImage, modal } = this.state;

    return (
      <div>
        {modal && <Modal onClose={this.closeModal} largeImage={largeImage} />}
        <ul className={styles.gallery}>
          {images.map(image => (
            <li key={image.id}>
              <GalleryItem
                image={image}
                onShowLarge={this.hadleLargeImageClick}
              />
            </li>
          ))}
        </ul>
        <button
          className={styles.showMoreButton}
          type="button"
          onClick={onSearch}
        >
          Load more
        </button>
      </div>
    );
  }
}

export default Gallery;
