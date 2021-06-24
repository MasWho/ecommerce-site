// Global imports
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Local components import
import Spinner from "../UI/Spinner";

// Styles imports
import styles from "./AuthForm.module.css";

// Hooks
import useHttp from "../../hooks/use-http";

// Action creators
import { authActions } from "../../store/redux/auth-slice";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

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
 * Component for rendering either the login form or signup form depending on the 'type' input.
 * @param {String} type - Either login or signup
 * @returns
 */
const AuthForm = ({ type }) => {
	const isLogin = type === "login";
	const history = useHistory();

	const { loading, error, request } = useHttp();

	// Refs for holding input values
	const emailRef = useRef();
	const passwordRef = useRef();

	// Store dispatcher
	const dispatch = useDispatch();

	/**
	 * Handle change between signup and login forms.
	 */
	const switchAuthModeHandler = () => {
		history.push(`/${isLogin ? "auth-signup" : "auth-login"}`);
	};

  /**
   * Handle logout action, remove token from local storage and reset state
   */
	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		dispatch(authActions.clearAuth());
	};

	/**
	 * TODO: Add validation for auth form inputs.
	 */
	// const inputValidation = () => {};

	/**
	 * Handle submission of auth form.
	 * Sends request to firebase auth api to create new user or login as existing user.
	 */
	const submitHandler = (event) => {
		event.preventDefault();
		const enteredEmail = emailRef.current.value;
		const enteredPassword = passwordRef.current.value;

		/**
		 * Handle a successful auth api response from firebase.
		 * Include persisting auth token and expiration time in browser localStorage.
		 * @param {Object} data
		 */
		const loginResponseHandler = (data) => {
			const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000);
			// Persist token and expiration details in local storage
			localStorage.setItem("token", data.idToken);
			localStorage.setItem("expirationTime", expirationTime.toISOString());

			const remainingTime = calculateRemainingTime(expirationTime.toISOString());
			const logoutTimer = setTimeout(logoutHandler, remainingTime);

			// Update global state via redux store
			dispatch(
				authActions.setAuth({
					token: data.idToken,
					expirationTime: expirationTime.toISOString(),
					initialLogoutTimer: logoutTimer,
				})
			);
			// Redirect to home page
			history.replace("/");
		};

		let url;
		if (!isLogin) {
			// Signup url
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
		} else {
			// Login url
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
		}

		// Send request to firebase for authenticating user, same body for both login and signup
		request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
			},
			loginResponseHandler
		);
	};

	return (
		<section className={styles.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
        {/* Email input */}
				<div className={styles.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" ref={emailRef} required />
				</div>
        {/* Password input */}
				<div className={styles.control}>
					<label htmlFor="password">Your Password</label>
					<input type="password" id="password" ref={passwordRef} required />
				</div>
        {/* Login action area */}
				<div className={styles.actions}>
					{/* Show error message if request failed */}
					{error && <p style={{ fontSize: "10px", marginBottom: 20, color: "pink" }}>{error.message}</p>}
					{/* Button for submitting form */}
					{!loading && <button>{isLogin ? "Login" : "Create Account"}</button>}
					{/* Loading spinner */}
					{loading && <Spinner />}
					<button type="button" className={styles.toggle} onClick={switchAuthModeHandler}>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
