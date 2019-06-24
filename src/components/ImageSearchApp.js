import React, { Component } from 'react';

import SearchForm from './SearchForm/SerachForm';
import Gallery from './Gallery/Gallery';
import Loader from './Loader/Loader';

import * as pixabayAPI from '../services/pixabayAPI';
import styles from './ImageSearchApp.module.css';

function scrollToBottom() {
  const bottom = document.querySelector('.bottom');
  bottom.scrollIntoView({ behavior: 'smooth' });
}

class ImageSearchApp extends Component {
  state = {
    searchValue: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const { searchValue } = this.state;
    const firstPage = 1;

    pixabayAPI
      .fetchImages(searchValue, firstPage)
      .then(({ data: hits }) =>
        this.setState(prevState => {
          return {
            images: hits.hits,
            page: prevState.page + 1,
          };
        }),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  showMore = () => {
    const { searchValue, page } = this.state;

    pixabayAPI
      .fetchImages(searchValue, page)
      .then(({ data: hits }) =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...hits.hits],
            page: page + 1,
          };
        }, scrollToBottom),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { searchValue, images, isLoading, error } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          onSubmit={this.handleSubmit}
          onSearch={this.handleChange}
          value={searchValue}
        />

        {error && <p>Something went wrong: {error.message}</p>}

        {(isLoading && <Loader />) ||
          (images.length > 0 && (
            <Gallery images={images} onSearch={this.showMore} />
          ))}

        <div className="bottom"></div>
      </div>
    );
  }
}

export default ImageSearchApp;
