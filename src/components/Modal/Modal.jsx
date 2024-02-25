import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onModalClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onModalClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modalWindow}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
