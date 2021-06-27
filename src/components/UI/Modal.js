// Global imports
import ReactDom from 'react-dom';

// Style imports
import styles from './Modal.module.css';

// Element for which the modal should be rendered within
const modalElement = document.getElementById('modal');

/**
 * Modal backdrop, if clicked should close the Modal.
 * @param {Function} onClick 
 * @returns 
 */
const Backdrop = ({onClick}) => {
    return <div className={styles.backdrop} onClick={onClick}/>
};

/**
 * The actual overlay for the modal.
 * @param {Object} children 
 * @returns 
 */
const ModalOverlay = ({children}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

/**
 * Wrapper component for creating a modal with backdrop using portal.
 * @param {Object} children 
 * @param {Function} onClickBackdrop 
 * @returns 
 */
const Modal = ({children, onClickBackdrop}) => {
    return ReactDom.createPortal(
        <>
          <Backdrop onClick={onClickBackdrop}/>
          <ModalOverlay>{children}</ModalOverlay>
        </>,
        modalElement
    );
};

export default Modal;