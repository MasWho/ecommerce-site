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
 * @param {Bool} userLoading
 * @param {Object} userError
 * @returns
 */
const Layout = ({ children, userLoading, userError }) => {
	return (
		<div className={styles['page-container']}>
			<Navbar userLoading={userLoading} userError={userError}/>
			<main className={styles["main-body"]}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
