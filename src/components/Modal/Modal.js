import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  state = {};

  backdropeRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onClose();
  };

  handleKeyDowm = () => {};

  handleBackDropClick = e => {
    const { current } = this.backdropeRef;
    if (current && e.target !== current) return;
    this.props.onClose();
  };

  render() {
    const { largeImage } = this.props;

    return (
      <div
        className={styles.overlay}
        onClick={this.handleBackDropClick}
        ref={this.backdropeRef}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex="0"
      >
        <div className={styles.modal}>
          <img src={largeImage} alt="" className={styles.modal} />
        </div>
      </div>
    );
  }
}

export default Modal;
