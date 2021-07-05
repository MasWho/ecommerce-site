// Global import
import { useState } from "react";

// Component imports
import TabsContainer from "../UI/TabsContainer";
import ProductGrid1 from "./ProductGrid1";
import ProductGrid2 from "./ProductGrid2";
import ProductGrid3 from "./ProductGrid3";
import Spinner from "../UI/Spinner";

// Styles imports
import styles from './Products.module.css';

// Assets import
import productsBanner from "../../assets/products-banner.png";

// Custom hooks imports
import useProducts from "../../hooks/use-products";

/**
 * Display all products for every product category, data us fetched from firebase
 * @returns 
 */
const Products = () => {

  const [category, setCategory] = useState("lounge");
  const [expandCard, setExpandCard] = useState(false);
	const [expandCardID, setExpandCardID] = useState(null);
  
  const {loading, error, productData} = useProducts('product');

  const changeTabHandler = (tabID) => {
    setCategory(tabID);
  };

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

  return (
    <div className={styles.container}>
      {/* Banner section */}
			<div className={styles.banner}>
				<img src={productsBanner} alt=""></img>
				<h1 className={styles["banner-text"]}>
					{category}
				</h1>
			</div>

      {/* Tabs section */}
      {loading && <Spinner style={{height: "70vh"}}/>}
      {!loading && !error && productData && <TabsContainer
        onChangeTab={changeTabHandler}
				components={{
					lounge: {
						title: "Lounge",
						component: <ProductGrid1
              products={productData['lounge']}
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />
					},
					bedroom: {
						title: "Bedroom",
						component: <ProductGrid2 
              products={productData['bedroom']}
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />
					},
					dining: {
						title: "Dining",
						component: <ProductGrid3 
              products={productData['dining']}
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />
					},
				}}
			/>}
    </div>
  )
};

export default Products;