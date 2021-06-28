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
 * @param {Object} style
 * @returns 
 */
const ModalOverlay = ({children, style}) => {
    return (
        <div className={styles.modal} style={{...style}}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

/**
 * Wrapper component for creating a modal with backdrop using portal.
 * @param {Object} children 
 * @param {Function} onClickBackdrop 
 * @param {Object} style 
 * @returns 
 */
const Modal = ({children, onClickBackdrop, style}) => {
    return ReactDom.createPortal(
        <>
          <Backdrop onClick={onClickBackdrop}/>
          <ModalOverlay style={style}>{children}</ModalOverlay>
        </>,
        modalElement
    );
};

export default Modal;