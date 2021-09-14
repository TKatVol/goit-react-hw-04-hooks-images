import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import s from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {

    const handleKeydownEsc = useCallback(event => {
        if (event.code === 'Escape') {
            onClose();
        }
    }, [onClose])

    useEffect(() => {
        window.addEventListener('keydown', handleKeydownEsc);

        return () => window.removeEventListener('keydown', handleKeydownEsc);
    }, [handleKeydownEsc])

    const handleBackdropClick = useCallback(event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }, [onClose])

    return createPortal(
        <div className={s.Overlay} onClick={handleBackdropClick}>
            <div className={s.Modal}>
                {children}
            </div>
        </div>,
        modalRoot,
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
}

