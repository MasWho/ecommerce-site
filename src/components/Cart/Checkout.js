// Global imports
import React, { useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";

// Style imports
import styles from "./Checkout.module.css";

// Hooks imports
import useHttp from "../../hooks/use-http";

// Store imports
import CartContext from "../../store/context/cart-context";

// Component imports

/**
 * Input component for checkout form.
 */
const Input = React.forwardRef(({ id, label, type, valid }, ref) => {
	const [focused, setFocused] = useState(false);

	let inputStyles = [styles.control];

	if (!valid) {
		inputStyles.push(styles.invalid);
	}

	// When input is focused position labels at the top
	if (focused || ref.current?.value) {
		inputStyles.push(styles.focused);
	}

	return (
		<div className={inputStyles.join(" ")}>
			<label htmlFor={id}>{`${label} ${!valid ? `(Please enter a valid ${id})` : ""}`}</label>
			<input autoComplete="off" type={type} id={id} ref={ref} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
			{/* {!valid && <p>{}</p>} */}
		</div>
	);
});

/**
 * Helper to check if input is empty.
 * @param {String} value 
 * @returns 
 */
const isEmpty = (value) => value.trim() === "";

/**
 * Helper to check if input is 4 characters long, SA zip code
 * @param {String} value 
 * @returns 
 */
const isFourChars = (value) => value.trim().length === 4;

/**
 * Component for checkout page after cart confirmation.
 * @param {Function} onCancel 
 * @param {Function} onSubmit 
 * @returns 
 */
const Checkout = ({ onCancel, onSubmit }) => {
	const cartCtx = useContext(CartContext);

	const { loading, error, request } = useHttp();

	const uid = useSelector(state => state.auth.uid);

  // State to check if all form inputs are valid
	const [formInputsValid, setFormInputsValid] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

  // Refs for inputs
	const nameRef = useRef();
	const streetRef = useRef();
	const cityRef = useRef();
	const postalRef = useRef();

  /**
   * Handle form submission, check if all inputs are valid.
   * If all inputs are valid, send request to back end.
   * @param {Object} event 
   * @returns 
   */
	const confirmHandler = (event) => {
		event.preventDefault();

		const nameValue = nameRef.current.value;
		const streetValue = streetRef.current.value;
		const cityValue = cityRef.current.value;
		const postalValue = postalRef.current.value;

    // Check to see if all form inputs are valid
		const nameIsValid = !isEmpty(nameValue);
		const streetIsValid = !isEmpty(streetValue);
		const cityIsValid = !isEmpty(cityValue);
		const postalIsValid = !isEmpty(postalValue) && isFourChars(postalValue);

		setFormInputsValid({
			name: nameIsValid,
			street: streetIsValid,
			city: cityIsValid,
			postalCode: postalIsValid,
		});

		const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

		if (!formIsValid) {
			return;
		}

		// Save cart items as order in database
		/**
		 * Data format: 
		 * 
		 * orders: {
		 * 		uid: {
		 * 			order_id: {
		 * 				details: {
		 * 					city,
		 * 					name,
		 * 					postalCode,
		 * 					street
		 * 				},
		 * 				orderedItems: [item...]
		 * 			}...
		 * 		}...
		 * }
		 */
		request(
		  `https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/orders/${uid}.json`,
		  {
		    method: "POST",
		    body: JSON.stringify({
		      details: {
		        name: nameValue,
		        street: streetValue,
		        city: cityValue,
		        postalCode: postalValue
		      },
		      orderedItems: cartCtx.items
		    })
		  },
		  onSubmit
		);
	};

	return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <Input id="name" label="Your Name" type="text" ref={nameRef} valid={formInputsValid.name} />
      <Input id="street" label="Street" type="text" ref={streetRef} valid={formInputsValid.street} />
      <Input id="city" label="City" type="text" ref={cityRef} valid={formInputsValid.city} />
      <Input id="postal" label="Postal Code" type="text" ref={postalRef} valid={formInputsValid.postalCode} />
      {
        loading
          ? <span style={{color: "#DEB200"}}>Sending Order...</span>
          : (
            <div className={styles.actions}>
              <button type="button" onClick={onCancel}>
                Back
              </button>
              <button type="submit" className={styles.submit}>
                Confirm
              </button>
            </div>
          )
      }
    </form>
  );
};

export default Checkout;
