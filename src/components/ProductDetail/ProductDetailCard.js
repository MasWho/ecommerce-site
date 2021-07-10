// Styles imports
import styles from "./ProductDetailCard.module.css";
import ProductDetailItemForm from "./ProductDetailItemForm";
import { useState } from "react";

/**
 * Card UI component to render details for a single product.
 * @param {Object} product
 * @param {Object} style
 * @returns
 */
const ProductDetailCard = ({ product, style }) => {

  // State for setting the current amount of product to be added to cart
  const [amount, setAmount] = useState(0);

	return (
		<div className={styles["card-container"]} style={{...style}}>
      {/* Details section */}
			<div className={styles["details-container"]}>
        <h2 className={styles.title}>{product.title}</h2>
        <div className={styles['price-and-stock']}>
          <p>{`ZAR ${product.price}`}</p>
          <p>{product.hasStock ? "In stock" : "Out of stock"}</p>
        </div>
        <p>{product.details}</p>
        <p>Size: To scale</p>
        <p>Material: As shown</p>
        <p>Colour(s) available: Pictured colour</p>
        <p>Delivery times: 2 - 5 working days</p>
        <p>Delivery areas: Nationwide</p>
			</div>
      <hr className={styles.line}/>
      {/* Cart Section */}
      <div className={styles['cart-container']}>
        <p>{`ZAR ${(amount * product.price).toFixed(2)}`}</p>
        <ProductDetailItemForm product={product} amount={amount} setAmount={setAmount}/>
      </div>
		</div>
	);
};

export default ProductDetailCard;
