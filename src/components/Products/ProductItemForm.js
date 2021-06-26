// Global imports
import React, {useRef, useState, useContext} from 'react';
import CartContext from '../../store/context/cart-context';
import { IconContext } from "react-icons";
import { MdAddShoppingCart } from "react-icons/md";

// Style imports
import styles from './ProductItemForm.module.css';

// Component imports
import Input from '../UI/Input';


/**
 * Form to add a product to cart from the product card.
 * @param {Object} product 
 * @returns 
 */
const ProductItemForm = ({product}) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();
	const cartCtx = useContext(CartContext);  // Cart context

	/**
	 * Handle form submission.
	 * @param {Object} e 
	 * @returns 
	 */
	const submitHandler = e => {
		e.preventDefault();
		const enteredValue = amountInputRef.current.value;  // Get the input value
		// Validate the data
		if(enteredValue.trim().length === 0 || +enteredValue < 1 || +enteredValue > 5) {
			setAmountIsValid(false);
			return;
		}

		const updatedProduct = {...product, amount: Number(enteredValue)};  // add amount of product to cart items state
		cartCtx.addItem(updatedProduct);

		amountInputRef.current.value = 0;

		//TODO: Show user that item successfully added to cart
	};

  return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="QTY"
				input={{
					id: `amount_${product.id}`,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "0",
				}}
			/>
			<IconContext.Provider value={{ size: "3em", color: "DEB200" }}>
				<button type="submit">
					<MdAddShoppingCart />
				</button>
			</IconContext.Provider>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default ProductItemForm;