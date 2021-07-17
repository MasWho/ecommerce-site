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
import styles from "./EditPassword.module.css";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

/**
 * Details page for user to edit password.
 * @returns 
 */
const EditPassword = () => {
	const dispatch = useDispatch();
	const authStates = useSelector((state) => state.auth);
	const { loading, error, request, setError } = useHttp();
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();
	const repeatPasswordRef = useRef();
  const [modal, setModal] = useState(false);

	/**
	 * Handle a successful password change. Make another request to firebase to actually change the password.
	 * Include persisting auth token.
	 * @param {Object} data
	 */
	const successLoginHandler = async (newPassword, data) => {
		request(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authStates.token,
          password: newPassword,
          returnSecureToken: true
        })
      },
      (data) => {
        // Persist token in local storage
		    localStorage.setItem("token", data.idToken);
        setModal(true);
        // Update global state via redux store
        dispatch(
          authActions.setAuth({
            token: data.idToken
          })
        );
      },
      setModal.bind(null, true)
    )
	};

  /**
   * Close the modal.
   */
  const closeModalHandler = () => {
    setModal(false);
    oldPasswordRef.current.value = null;
    newPasswordRef.current.value = null;
    repeatPasswordRef.current.value = null;
  }

	/**
	 * Handles submission of the user details form, makes requests to various firebase endpoints for updating relevant info
	 * @param {Object} e
	 * @returns
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		const oldPassword = oldPasswordRef.current.value;
		const newPassword = newPasswordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    // First check if repeat Password and new Password corresponds
    if(newPassword !== repeatPassword) {
      setError({message: "Password confirmation failed!"});
      setModal(true);
      return;
    }

		// Check to see if old password is correct by signing in with email and password
		request(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authStates.email,
          password: oldPassword,
          returnSecureToken: true
        })
      },
      successLoginHandler.bind(null, newPassword),
      setModal.bind(null, true)
    )
	};

  // Form for display when not loading
	const formDisplay = !loading && (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				label="Old Password"
				input={{
					id: "old-password",
					type: "password",
					required: true
				}}
				labelStyle={{
					fontSize: "1rem",
					color: "black",
				}}
				inputStyle={{
					minWidth: "50%",
					height: "2em",
					color: "black",
				}}
				ref={oldPasswordRef}
			/>
			<Input
				label="New Password"
				input={{
					id: "new-password",
					type: "password",
					required: true
				}}
				labelStyle={{
					fontSize: "1rem",
					color: "black",
				}}
				inputStyle={{
					minWidth: "50%",
					height: "2em",
					color: "black",
				}}
				ref={newPasswordRef}
			/>
      <Input
				label="Confirm New Password"
				input={{
					id: "repeat-password",
					type: "password",
					required: true
				}}
				labelStyle={{
					fontSize: "1rem",
					color: "black",
				}}
				inputStyle={{
					minWidth: "50%",
					height: "2em",
					color: "black",
				}}
				ref={repeatPasswordRef}
			/>
			<button className={styles.submit} type="submit">
				Save Changes
			</button>
		</form>
	);
  
  // Display spinner if loading
	const loadingDisplay = (loading) && 
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
    <Modal onClickBackdrop={closeModalHandler} style={{
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
        <button onClick={closeModalHandler}>Close</button>
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

export default EditPassword;
