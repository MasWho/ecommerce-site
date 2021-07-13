// Global imports
import { useRouteMatch, NavLink } from "react-router-dom";
import { BsFillPeopleFill, BsCardChecklist, BsCardHeading, BsFillShieldLockFill } from "react-icons/bs";
import { IconContext } from "react-icons";

// Style imports
import styles from "./ProfileNav.module.css";

/**
 * The Vertical nav bar for the profile page.
 * @returns 
 */
const ProfileNav = () => {

	const { url } = useRouteMatch();

	return (
		<ul className={styles["nav-container"]}>
			<IconContext.Provider value={{ size: "1.5em", color: "white" }}>
				<li className={styles["list-item"]}>
					<BsFillPeopleFill />
					<NavLink activeClassName={styles.active} to={`${url}/details`}>
						Profile details
					</NavLink>
				</li>
				<li className={styles["list-item"]}>
					<BsCardHeading />
					<NavLink activeClassName={styles.active} to={`${url}/current-order`}>
						Current orders
					</NavLink>
				</li>
				<li className={styles["list-item"]}>
					<BsCardChecklist />
					<NavLink activeClassName={styles.active} to={`${url}/past-orders`}>
						Past orders
					</NavLink>
				</li>
				<li className={styles["list-item"]}>
					<BsFillShieldLockFill />
					<NavLink activeClassName={styles.active} to={`${url}/password`}>
						Edit password
					</NavLink>
				</li>
			</IconContext.Provider>
		</ul>
	);
};

export default ProfileNav;
