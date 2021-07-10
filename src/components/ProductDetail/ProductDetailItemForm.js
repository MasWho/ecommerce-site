// Global imports
import React, {useState, useContext} from 'react';
import CartContext from '../../store/context/cart-context';
import { IconContext } from "react-icons";
import { MdAddShoppingCart } from "react-icons/md";

// Style imports
import styles from './ProductDetailItemForm.module.css';

// Component imports
import ProductDetailInput from './ProductDetailInput';


/**
 * Form to add a product to cart from the product details card.
 * @param {Object} product 
 * @returns 
 */
const ProductDetailItemForm = ({product, amount, setAmount}) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const cartCtx = useContext(CartContext);  // Cart context

	/**
	 * Handle form submission.
	 * @param {Object} e 
	 * @returns 
	 */
	const submitHandler = e => {
		e.preventDefault();
		const enteredValue = amount;  // Get the input value
		// Validate the data
		if(enteredValue.trim().length === 0 || +enteredValue < 1 || +enteredValue > 5) {
			setAmountIsValid(false);
			return;
		}

		const updatedProduct = {...product, amount: Number(enteredValue)};  // add amount of product to cart items state
		cartCtx.addItem(updatedProduct);

    setAmount(0);
	};

  return (
		<form className={styles.form} onSubmit={submitHandler}>
			<ProductDetailInput
				value={amount}
        onChange={setAmount}
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
			<IconContext.Provider value={{ size: "1.2rem", color: "DEB200" }}>
				<button type="submit">
					<MdAddShoppingCart /><span>Add to cart</span>
				</button>
			</IconContext.Provider>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default ProductDetailItemForm;