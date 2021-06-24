// Styles imports
import styles from "./Card.module.css";

// Global imports
import { BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";
import { MdAddShoppingCart } from "react-icons/md";

/**
 * Card UI component to render products.
 * @param {String} topText
 * @param {String} title
 * @param {String} price
 * @param {Boolean} hasStock
 * @param {String} details
 * @param {Object} img
 * @param {Number} height
 * @param {Number} width
 * @param {Function} onExpand
 * @param {Bool} expandCard
 * @param {Number} expandCardID
 * @param {Number} id
 * @returns
 */
const Card = ({ topText, title, price, hasStock, details, img, height, width, onExpand, expandCard, expandCardID, id }) => {

	let expandStyles = styles['expand-container'];
	if(expandCard && id === expandCardID) {
		expandStyles = [styles['expand-container'], styles['drawer-open']].join(" ");
	} else {
		expandStyles = [styles['expand-container'], styles['drawer-close']].join(" ");
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
					<img src={img} alt="" />
				</div>
				{/* Bottom section */}
				<div className={styles["bot-container"]}>
					<div className={styles["info-container"]}>
						<h2>{title}</h2>
						<div className={styles["price-stock"]}>
							<span>{price}</span>
							<span>{hasStock ? "In Stock" : "Out of Stock"}</span>
						</div>
					</div>
					<IconContext.Provider value={{ size: "3em", color: "DEB200" }}>
						<button>
							<MdAddShoppingCart />
						</button>
					</IconContext.Provider>
				</div>
			</div>
			{/* Expand detail section */}
			<div className={expandStyles}>
				<p>{details}</p>
			</div>
		</div>
	);
};

export default Card;
