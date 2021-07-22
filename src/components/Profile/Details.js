// Global imports
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Component imports
import Input from "../UI/Input";
import Spinner from "../UI/Spinner";
import Modal from "../UI/Modal";

// Hooks imports
import useHttp from "../../hooks/use-http";

// Store imports
import { authActions } from "../../store/redux/auth-slice";

// Style imports
import styles from "./Details.module.css";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

/**
 * Details page for user to edit personal profiles.
 * @returns 
 */
const Details = () => {
	const dispatch = useDispatch();
	const authStates = useSelector((state) => state.auth);
	const { loading, error, request } = useHttp();
	const nameRef = useRef(authStates.username);
	const emailRef = useRef(authStates.email);
  const [modal, setModal] = useState(false);

	/**
	 * Handle a successful email change.
	 * Include persisting auth token.
	 * @param {Object} data
	 */
	const changeEmailHandler = async (data) => {
		// Persist token and expiration details in local storage
		localStorage.setItem("token", data.idToken);

		const userDatabaseURL = `https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/users/${data.localId}.json`;

		// Update user email
		request(userDatabaseURL, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.email,
			}),
		});

    setModal(true);

		// Update global state via redux store
		dispatch(
			authActions.setAuth({
				token: data.idToken,
				email: data.email,
			})
		);
	};

	/**
	 * Handles submission of the user details form, makes requests to various firebase endpoints for updating relevant info
	 * @param {Object} e
	 * @returns
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		const enteredName = nameRef.current.value;
		const enteredEmail = emailRef.current.value;
		// Check to see if username or email changed don't need to update either if didn't change
		if (enteredName === authStates.username && enteredEmail === authStates.email) {
			return;
		} else if (enteredEmail === authStates.email) {
			// Update username
			request(
				`https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/users/${authStates.uid}.json`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: enteredName,
					}),
				},
				() => {
          setModal(true);
          dispatch(authActions.setAuth({ username: enteredName }));
        }
			);
		} else if (enteredName === authStates.username) {
			// Update email address
			request(
				`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						idToken: authStates.token,
						email: enteredEmail,
						returnSecureToken: true,
					}),
				},
				changeEmailHandler,
        setModal.bind(null, true)
			);
		} else {
			// Update both username and email address
			request(
				`https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/users/${authStates.uid}.json`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: enteredName,
					}),
				},
				() => {
          setModal(true);
          dispatch(authActions.setAuth({ username: enteredName }));
        }
			);
			request(
				`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						idToken: authStates.token,
						email: enteredEmail,
						returnSecureToken: true,
					}),
				},
				changeEmailHandler,
        setModal.bind(null, true)
			);
		}
	};

  // Form for display when not loading
	const formDisplay = !loading && authStates.username && authStates.email && (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				label="Name"
				input={{
					id: "name",
					type: "text",
					required: true,
					defaultValue: authStates.username,
				}}
				labelStyle={{
					fontSize: "1rem",
					color: "black",
				}}
				inputStyle={{
					minWidth: "400px",
					height: "2em",
					color: "black",
				}}
				ref={nameRef}
			/>
			<Input
				label="Email"
				input={{
					id: "email",
					type: "email",
					required: true,
					defaultValue: authStates.email,
				}}
				labelStyle={{
					fontSize: "1rem",
					color: "black",
				}}
				inputStyle={{
					minWidth: "400px",
					height: "2em",
					color: "black",
				}}
				ref={emailRef}
			/>
			<button className={styles.submit} type="submit">
				Save Changes
			</button>
		</form>
	);
  
  // Display spinner if loading
	const loadingDisplay = (!authStates.username || loading) && 
    <div className={styles.form}>
      <div style={{
        display: "flex",
        alignItems: "center", 
        justifyContent: "center",
        width: "50%",
        height: "25vh"}}>
        <Spinner />
      </div>
    </div>;

  // Display modal for successful form submission
  const modalDisplay = (
    <Modal onClickBackdrop={setModal.bind(null, false)} style={{
      top: '40%',
      height: '20vh',
      width: '30rem',
      left: 'calc(50% - 15rem)'
    }}>
      <div className={styles.modal}>
        {
          error
            ? <p>Error: {error.message}</p>
            : <p>Profile Details Changed Successfully!</p>
        }
        <button onClick={setModal.bind(null, false)}>Close</button>
      </div>
    </Modal>
  );

	return (
		<>
			{formDisplay}
			{loadingDisplay}
      {modal && modalDisplay}
		</>
	);
};

export default Details;
