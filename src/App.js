// Global imports
import { useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Pages imports
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

// Layout imports
import Layout from "./components/Layout/Layout";

// Action creators
import { authActions } from "./store/redux/auth-slice";

// Hooks import
import useHttp from './hooks/use-http';

let logoutTimer;  // Global logoutTimer reference, can't set it in states due to infinite loop

/**
 * Calculate the remaining duration with respect to a expiration timestamp from now.
 * @param {String} expirationTime 
 * @returns 
 */
const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();
	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

/**
 * Retrieve auth token and associated expiry timestamp from local storage.
 * @returns 
 */
const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem("token");
	const expirationTime = localStorage.getItem("expirationTime");
	const storedUid = localStorage.getItem("uid");
	const remainingTime = calculateRemainingTime(expirationTime);  // In ms

	// Remove token if it's about to expire
	if (remainingTime <= 3600) {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		localStorage.removeItem("uid");
		return null;
	}

	return {
		token: storedToken,
		uid: storedUid,
		duration: remainingTime,
		expirationTime: expirationTime,
	};
};

function App() {
	
	const dispatch = useDispatch();
	const authStates = useSelector((state) => state.auth);

	const {loading, error, request} = useHttp();
	
	// Retrieve token from local storage if page refreshed
	const tokenData = retrieveStoredToken();

	/**
	 * Handle logout action, remove token from local storage and reset state
	 */
  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    dispatch(authActions.clearAuth());
  }, [dispatch]);

	useEffect(() => {
		// If there is a token and it's not expired, then set the state with token
		// Also create another logout timer with updated remaining duration in ms
		if (tokenData && tokenData.token) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);

			dispatch(
				authActions.setAuth({
					token: tokenData.token,
					uid: tokenData.uid,
					expirationTime: tokenData.expirationTime,
          initialLogoutTimer: null  // This timer is only for initial reference from the AuthForm login
				})
			);
		}

		// Clear the logout timer if unmounted
		return () => {
			if(authStates.initialLogoutTimer) {
				// Clearing logout timer from initial login
				clearTimeout(authStates.initialLogoutTimer);
			}

			clearTimeout(logoutTimer)
		}
	}, [tokenData, dispatch, logoutHandler, authStates.initialLogoutTimer]);

	// Get username and set it to states
	useEffect(() => {
		if(authStates.isLoggedIn && !authStates.username) {
			request(
				`https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/users/${authStates.uid}.json`,
				{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
					}
				},
				(data) => {
					dispatch(
						authActions.setAuth({
							username: data.name
						})
					);
				}
			);
		}
	}, [authStates.uid, authStates.isLoggedIn, request, dispatch, authStates.username]);

	return (
		<Layout userLoading={loading} userError={error}>
			<Switch>
				<Route path={"/"} component={HomePage} exact />
				{!authStates.isLoggedIn ? (
					// Pre-login routes
					<>
						<Route path={"/auth-signup"} exact>
							<AuthPage type="signup" />
						</Route>
						<Route path={"/auth-login"}>
							<AuthPage type="login" />
						</Route>
					</>
				) : (
					// Post-login routes
					<>
						<Route path={"/products"} component={ProductsPage} />
						<Route path={"/profile"} component={ProfilePage} />
					</>
				)}
				<Route path={"*"} component={ErrorPage} />
			</Switch>
		</Layout>
	);
}

export default App;
