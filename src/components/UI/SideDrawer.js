// Global imports
import ReactDom from "react-dom";

// Styles imports
import styles from "./SideDrawer.module.css";

// Element for which the modal should be rendered within
const modalElement = document.getElementById('modal');

/**
 * Side drawer backdrop, if clicked should close the Modal.
 * @param {Function} onClick 
 * @returns 
 */
 const Backdrop = ({onClick}) => {
  return <div className={styles.backdrop} onClick={onClick}/>
};


/**
 * For rendering a side drawer.
 * @param {Bool} show 
 * @param {Function} onClickBackdrop 
 * @param {Object} children 
 * @returns 
 */
const SideDrawer = ({show, onClickBackdrop, children}) => {
  let drawerClasses = [styles["side-drawer"]];

  if (show) {
    drawerClasses = [styles["side-drawer"], styles["open"]];
  }

  return ReactDom.createPortal(
    <>
      {show && <Backdrop onClick={onClickBackdrop} />}
      <nav className={drawerClasses.join(" ")}>
        {children}
      </nav>
    </>,
    modalElement
  );
};

export default SideDrawer;