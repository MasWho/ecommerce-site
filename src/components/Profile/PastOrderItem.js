// Global imports
import { BsChevronRight } from "react-icons/bs";
import { IconContext } from "react-icons";

// Style imports
import styles from "./PastOrderItem.module.css";

/**
 * UI for a single past order.
 * @param {Object} order
 * @param {Function} onClick
 * @param {String} expand
 * @returns
 */
const PastOrderItem = ({ order, onClick, expand }) => {
	// Calculate total price for an order
	let totalPrice = 0;
	for (const item of order.orderedItems) {
		totalPrice += item.price * item.amount;
	}

	// Display details for items within an order
	const orderedItems = (
		<div className={styles["items-container"]}>
			Ordered Products:
			{order.orderedItems.map((item) => {
				return (
					<div className={styles["item-container"]}>
						<img src={item.img} alt="" />
						<div className={styles["item-descriptions"]}>
							<h3>{item.title}</h3>
							<span>Price: ZAR {item.price.toFixed(2)}</span>
							<span>QTY: {item.amount}</span>
						</div>
					</div>
				);
			})}
		</div>
	);

	// Display order details such as shipping address etc
	const orderDetails = (
		<div className={styles["details-container"]}>
			Order Details:
			<span>Name - {order.details.name}</span>
			<span>City - {order.details.city}</span>
			<span>Street - {order.details.street}</span>
			<span>Postal code - {order.details.postalCode}</span>
		</div>
	);

	return (
		<IconContext.Provider value={{ color: "#deb200", size: "2rem" }}>
			<div className={styles.container} onClick={() => onClick(order.id)}>
				{/* Expand heading */}
				<div className={styles["expand-heading"]}>
					<BsChevronRight
						style={{
							transition: "all 0.1s linear",
							transform: expand === order.id ? "rotate(90deg)" : null,
						}}
					/>
					<span>Order: {order.id}</span>
				</div>
				{/* Expand body */}
				<div className={[styles["expand-body"], expand === order.id ? styles["expand"] : ""].join(" ")}>
					{orderedItems}
					{orderDetails}
				</div>
				{expand === order.id && (
					<>
						<hr style={{ border: "none", width: "95%", margin: "0 auto", height: 1.5, backgroundColor: "#deb200" }} />
						<span className={styles["total-price"]}>Total Price: ZAR {totalPrice.toFixed(2)}</span>
					</>
				)}
			</div>
		</IconContext.Provider>
	);
};

export default PastOrderItem;
