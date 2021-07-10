// Styles imports
import styles from "./ProductCard.module.css";

// Component imports
import ProductItemForm from "./ProductItemForm";

// Global imports
import { BsThreeDots } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

/**
 * Card UI component to render products.
 * @param {String} topText
 * @param {Object} product
 * @param {Number} height
 * @param {Number} width
 * @param {Function} onExpand
 * @param {Bool} expandCard
 * @param {Number} expandCardID
 * @param {String} category
 * @returns
 */
const ProductCard = ({ topText, product, height, width, onExpand, expandCard, expandCardID, category }) => {

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
				<div 
					className={[expandCard && product.id === expandCardID ? styles["move-up"] : styles["move-down"]].join(" ")}
					style={{position: 'relative'}}
				>
					<div className={styles["bot-container"]}>
						<div className={styles["info-container"]}>
							<h2>{product.title}</h2>
							<div className={styles["price-stock"]}>
								<span>{`ZAR ${product.price}`}</span>
								<span>{product.hasStock ? "In Stock" : "Out of Stock"}</span>
							</div>
						</div>
						<ProductItemForm product={product} />
					</div>
					{/* Expand detail section */}
					<div className={expandStyles}>
						<p>{product.details}</p>
						<Link to={`/products/${category}/${product.id}`} className={styles['details-link']}><div className={styles.play}/>Click to learn more</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
