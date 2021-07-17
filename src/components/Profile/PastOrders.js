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

//Global imports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Hooks imports
import useHttp from "../../hooks/use-http";

// Style imports
import styles from "./PastOrders.module.css";

// Component imports
import Spinner from "../UI/Spinner";
import PastOrderItem from "./PastOrderItem";

/**
 * UI for all past orders linked to a authenticated user.
 */
const PastOrders = () => {
	const [orders, setOrders] = useState(null);
	const [expandOrder, setExpandOrder] = useState(null);
	const authStates = useSelector((state) => state.auth);
	const { loading, error, request } = useHttp();

	/**
	 * Handle clicking of a single order.
	 * @param {String} id
	 */
	const clickOrderHandler = (id) => {
		// Close card if already open
		if (expandOrder === id) {
			setExpandOrder(null);
		} else {
			setExpandOrder(id);
		}
	};

	// Load all past orders for user
	useEffect(() => {
		request(
			`https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/orders/${authStates.uid}.json`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			(data) => {
				// Transform data into array of objects, easier to work with
				const transformedData = [];
				for (const [key, val] of Object.entries(data)) {
					transformedData.push({
						id: key,
						...val,
					});
				}
				setOrders(transformedData);
			}
		);
	}, [authStates.uid, request]);

	// Display spinner if loading
	const loadingDisplay = loading && (
		<div>
			<Spinner />
		</div>
	);

	const ordersDisplay =
		!loading &&
		!error &&
		orders &&
		orders.map((order) => {
			return <PastOrderItem order={order} key={order.id} onClick={clickOrderHandler} expand={expandOrder} />;
		});

	return (
		<div className={styles.container}>
			{loadingDisplay}
			{ordersDisplay}
		</div>
	);
};

export default PastOrders;
