// Styles imports
import styles from './Footer.module.css';

/**
 * Footer component part of the overall site layout.
 * @returns 
 */
const Footer = () => {
    return (
        <div className={styles['footer-container']}>
            <hr className={styles['footer-line']} />
            <footer className={styles.footer}>
                <p>Contact Us: test@gmail.com</p>
                <p>Address: 21 test street, in the sky, earth</p>
                <p>Shipping: 2 - 5 days</p>
            </footer>
        </div>
    );
};

export default Footer;