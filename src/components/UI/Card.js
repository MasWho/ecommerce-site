// Styles imports
import styles from "./Card.module.css";

// Global imports
import { BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";
import { MdAddShoppingCart } from "react-icons/md";
import { useContext } from "react";
import CartContext from "../../store/context/cart-context";

/**
 * Card UI component to render products.
 * @param {String} topText
 * @param {Object} product
 * @param {Number} height
 * @param {Number} width
 * @param {Function} onExpand
 * @param {Bool} expandCard
 * @param {Number} expandCardID
 * @returns
 */
const Card = ({ topText, product, height, width, onExpand, expandCard, expandCardID }) => {
	// Cart context
	const cartCtx = useContext(CartContext);

	let expandStyles = styles["expand-container"];
	if (expandCard && product.id === expandCardID) {
		expandStyles = [styles["expand-container"], styles["drawer-open"]].join(" ");
	} else {
		expandStyles = [styles["expand-container"], styles["drawer-close"]].join(" ");
	}

	return (
		<div className={styles["card-outer-container"]} style={{ height: height, width: width }}>
			<div className={styles["card-inner-container"]}>
				{/* Top section */}
				<IconContext.Provider value={{ size: "2em" }}>
					<div className={styles["top-container"]}>
						<h3>
							<span>{topText}</span>
						</h3>
						<button onClick={onExpand}>
							<BsThreeDots />
						</button>
					</div>
				</IconContext.Provider>
				{/* Product image */}
				<div className={styles["img-container"]}>
					<img src={product.img} alt="" />
				</div>
				{/* Bottom section */}
				<div className={styles["bot-container"]}>
					<div className={styles["info-container"]}>
						<h2>{product.title}</h2>
						<div className={styles["price-stock"]}>
							<span>{`ZAR ${product.price}`}</span>
							<span>{product.hasStock ? "In Stock" : "Out of Stock"}</span>
						</div>
					</div>
					<IconContext.Provider value={{ size: "3em", color: "DEB200" }}>
						<button onClick={cartCtx.addItem.bind(null, product)}>
							<MdAddShoppingCart />
						</button>
					</IconContext.Provider>
				</div>
			</div>
			{/* Expand detail section */}
			<div className={expandStyles}>
				<p>{product.details}</p>
			</div>
		</div>
	);
};

export default Card;
