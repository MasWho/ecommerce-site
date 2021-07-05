// Global import
import { useEffect, useState } from "react";

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

// Store imports
import useProducts from "../../hooks/use-products";

const Home = () => {

	const [applyStyle, setApplyStyle] = useState(false);
	const [expandCard, setExpandCard] = useState(false);
	const [expandCardID, setExpandCardID] = useState(null);

	const {loading, error, productData} = useProducts('home');

	useEffect(() => {
		setApplyStyle(true);
	}, []);

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
