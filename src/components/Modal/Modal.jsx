import React, { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';


class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { handleOverlayClick } = this;
    return (
      <div className={styles.Overlay} onClick={handleOverlayClick}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>
    );
  };
};

Modal.defaultProps = {
  onClick: () => {}
};

Modal.propTypes = {
  onClick: PropTypes.func,
};

export default Modal;