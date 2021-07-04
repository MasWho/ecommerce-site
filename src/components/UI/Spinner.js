import styles from './Spinner.module.css';

/**
 * Simple component to display a spinner.
 * @returns 
 */
const Spinner = ({style}) => {
    return (
        <div style={{...style, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className={styles["lds-ripple"]}>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;