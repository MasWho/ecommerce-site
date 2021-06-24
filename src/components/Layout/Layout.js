// Local component imports
import Navbar from "./Navbar";
import Footer from "./Footer";

// Styles imports
import styles from "./Layout.module.css";

/**
 * Overall Layout component for the site, consists of:
 * - Navbar
 * - Main body section of site
 * - Footer
 * @param {Object} children
 * @returns
 */
const Layout = ({ children }) => {
	return (
		<div className={styles['page-container']}>
			<Navbar />
			<main className={styles["main-body"]}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
