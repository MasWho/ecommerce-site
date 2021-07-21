// Global imports
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import {BsFillPersonFill} from 'react-icons/bs';
import { useState } from "react";

// Component imports
import HeaderCartButton from './HeaderCartButton';
import Hamburger from "../UI/Hamburger";
import SideDrawer from "../UI/SideDrawer";

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

	const [drawerOpen, setDrawerOpen] = useState(false);

	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		if (authStates.logoutTimer) {
			clearTimeout(authStates.logoutTimer);
		}
		dispatch(authActions.clearAuth());
		setDrawerOpen(false);
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

	/**
	 * Handle burger click for smaller screen sizes
	 */
	const burgerClickHandler = () => {
		setDrawerOpen(true);
	};

	const backdropClickHandler = () => {
		setDrawerOpen(false);
	};

	return (
		<header className={styles.header}>
			{/* Logo */}
			<Link to="/">
				<div className={styles.logo}>M-EKO</div>
			</Link>

			<nav>
				{
					// Menu for pre login
					!authStates.isLoggedIn ? (
						<ul className={styles["pre-login"]}>
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
						</ul>
					) : (
						<>
							{/* Menu for post login */}
							<ul className={styles["post-login"]}>
								{/* Hamburger for smaller screen size */}
								<Hamburger className={styles.burger} onClick={burgerClickHandler}/>
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
									<HeaderCartButton color="white"/>
								</li>
							</ul>
						</>
					)
				}
			</nav>
			{/* Doesn't matter what it's placed, using portal */}
			<SideDrawer show={drawerOpen} onClickBackdrop={backdropClickHandler}>
				<ul className={styles['side-drawer']}>
					<li>
						<NavLink activeClassName={styles.active} to={"/products"} onClick={backdropClickHandler}>
							PRODUCTS
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={styles.active} to={"/profile"} onClick={backdropClickHandler}>
							PROFILE
						</NavLink>
					</li>
					<li>
						<Link to={"/"} onClick={logoutHandler}>
							LOGOUT
						</Link>
					</li>
					<li style={{backgroundColor: "#ffffff00"}}>
						<HeaderCartButton onClick={backdropClickHandler} color="#1b2039" backgroundColor="#ffffff00"/>
					</li>
				</ul>
			</SideDrawer>
		</header>
	);
};

export default Navbar;
