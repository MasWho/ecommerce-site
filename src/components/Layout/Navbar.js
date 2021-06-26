// Global imports
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import {BsFillPersonFill} from 'react-icons/bs';

// Component imports
import HeaderCartButton from './HeaderCartButton';

// Styles imports
import styles from "./Navbar.module.css";

// Action creators
import { authActions } from "../../store/redux/auth-slice";

/**
 * Navigational layout component for directing users to top level page routes.
 * Differentiates between pre login and post login nav items.
 * @param {Bool} userLoading
 * @param {Object} userError
 * @returns
 */
const Navbar = ({userLoading, userError}) => {
	const authStates = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		if (authStates.logoutTimer) {
			clearTimeout(authStates.logoutTimer);
		}
		dispatch(authActions.clearAuth());
	};

	// Username icon
	const userNameIcon = (
		<IconContext.Provider value={{ size: "1.5em", color: "DEB200" }}>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				gap: '0.5em'
			}}>
				<BsFillPersonFill />
				{userLoading ? "loading..." : !userError && authStates.username}
			</div>
		</IconContext.Provider>
	);

	return (
		<header className={styles.header}>
			{/* Logo */}
			<Link to="/">
				<div className={styles.logo}>M-EKO</div>
			</Link>

			<nav>
				<ul>
					{
						// Menu for pre login
						!authStates.isLoggedIn ? (
							<>
								<li>
									<NavLink activeClassName={styles.active} to={"/auth-signup"}>
										SIGN UP
									</NavLink>
								</li>
								<li>
									<NavLink activeClassName={styles.active} to={"/auth-login"}>
										LOGIN
									</NavLink>
								</li>
							</>
						) : (
							// Menu for post login
							<>
								<li className={styles.username}>
									{userNameIcon}
								</li>
								<li>
									<NavLink activeClassName={styles.active} to={"/products"}>
										PRODUCTS
									</NavLink>
								</li>
								<li>
									<NavLink activeClassName={styles.active} to={"/profile"}>
										PROFILE
									</NavLink>
								</li>
								<li>
									<Link to={"/"} onClick={logoutHandler}>
										LOGOUT
									</Link>
								</li>
								<li>
									<HeaderCartButton />
								</li>
							</>
						)
					}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
