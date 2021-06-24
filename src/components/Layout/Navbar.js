// Global imports
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Styles imports
import styles from "./Navbar.module.css";

// Action creators
import { authActions } from "../../store/redux/auth-slice";

/**
 * Navigational layout component for directing users to top level page routes.
 * Differentiates between pre login and post login nav items.
 * @returns
 */
const Navbar = () => {
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
							</>
						)
					}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
