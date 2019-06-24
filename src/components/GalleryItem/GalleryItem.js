import React from 'react';
import PropTypes from 'prop-types';
import './GalleryItem.css';

const GalleryItem = ({ image, onShowLarge }) => {
  const {
    likes,
    views,
    comments,
    downloads,
    webformatURL,
    largeImageURL,
  } = image;

  return (
    <div className="photo-card">
      <img src={webformatURL} alt="img" />
      <div className="stats">
        <p className="stats-item">
          <i className="material-icons">thumb_up</i>
          {likes}
        </p>
        <p className="stats-item">
          <i className="material-icons">visibility</i>
          {views}
        </p>
        <p className="stats-item">
          <i className="material-icons">comments</i>
          {comments}
        </p>
        <p className="stats-item">
          <i className="material-icons">cloud_download</i>
          {downloads}
        </p>
      </div>

      <button
        className="fullscreen-button"
        type="button"
        onClick={() => onShowLarge(largeImageURL)}
      >
        <i className="material-icons">zoom_out_map</i>
      </button>
    </div>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onShowLarge: PropTypes.func.isRequired,
};

export default GalleryItem;
