// Global import
import { useEffect, useState, useCallback, useContext } from "react";

// Component imports
import TabsContainer from "../UI/TabsContainer";
import HomeProducts1 from "./HomeProducts1";
import HomeProducts2 from "./HomeProducts2";
import HomeProducts3 from "./HomeProducts3";
import Spinner from "../UI/Spinner";

// Styles import
import styles from "./Home.module.css";

// Assets import
import homeBanner from "../../assets/home-banner.jpg";

// Custom hooks imports
import useHttp from '../../hooks/use-http';

// Store imports
import FirebaseContext from "../../store/context/firebase-context";

const Home = () => {

	const [applyStyle, setApplyStyle] = useState(false);
	const [expandCard, setExpandCard] = useState(false);
	const [expandCardID, setExpandCardID] = useState(null);
	const [productData, setProductData] = useState(null);

	const {loading, error, request} = useHttp();

	const firebaseCtx = useContext(FirebaseContext);

	/**
	 * Get all product images from firebase storage.
	 * The link is specified in the img property of each product, which links to unique storage objects.
	 */
	const getAllProductImages = useCallback(async (data) => {
		const modifiedData = {...data};
		for(const cat in modifiedData) {
			for(const product of modifiedData[cat]) {
				try {
					product.img = await firebaseCtx.storageRef.child(product.img).getDownloadURL();
				} catch (error) {
					product.img = ""; // TODO: Create asset for no product image
				}
			}
		}
		return modifiedData;
	}, [firebaseCtx.storageRef]);

	useEffect(() => {
		setApplyStyle(true);
	}, []);

	// Get all products from product catalog in db
	useEffect(() => {
		request(
			"https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/products.json",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			},
			async (data) => {
				const modifiedData = await getAllProductImages(data);
				setProductData(modifiedData)
			}
		)
	}, [request, getAllProductImages]);

	/**
	 * Handle card detail expansion click event
	 * @param {Number} id - ID of the card
	 */
	const expandCardHandler = (id) => {
		if (expandCard && expandCardID === id) {
			setExpandCard(false);
			setExpandCardID(null);
		} else if (expandCard && expandCardID !== id) {
			setExpandCardID(id);
		} else {
			setExpandCard(true);
			setExpandCardID(id);
		}
	};

  /**
   * Reset all cards expanded
   */
  const resetCards = () => {
    setExpandCard(false);
    setExpandCardID(null);
  };

	return (
		<div className={styles.container}>
			{/* Banner section */}
			<div className={styles.banner}>
				<img src={homeBanner} alt="" />
				<div className={styles["banner-text-container"]}>
					<span className={`${styles["banner-main-text"]} ${applyStyle ? styles["move-in"] : ""}`}>Welcome</span>
					<span className={styles["banner-text-separator"]}>|</span>
					<span className={`${styles["banner-sub-text"]} ${applyStyle ? styles["move-in"] : ""}`}>Shop with comfort</span>
				</div>
			</div>

			{/* Product Tabs */}
			{loading && <Spinner style={{height: "70vh"}}/>}
			{!loading && !error && productData && <TabsContainer
        onChangeTab={resetCards}
				components={{
					lounge: {
						title: "Lounge",
						component: <HomeProducts1 
              products={productData['lounge']} 
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />,
					},
					bedroom: {
						title: "Bedroom",
						component: <HomeProducts2 
              products={productData['bedroom']} 
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />,
					},
					dining: {
						title: "Dining",
						component: <HomeProducts3 
              products={productData['dining']} 
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />,
					},
				}}
			/>}
		</div>
	);
};

export default Home;
