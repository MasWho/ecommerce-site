import styles from './Spinner.module.css';

/**
 * Simple component to display a spinner.
 * @returns 
 */
const Spinner = () => {
    return (
        <div style={{width: "100%", height: "100%", textAlign: "center"}}>
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