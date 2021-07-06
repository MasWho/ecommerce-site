// Global import
import { useState } from "react";

// Component imports
import TabsContainer from "../UI/TabsContainer";
import ProductGrid1 from "./ProductGrid1";
import ProductGrid2 from "./ProductGrid2";
import ProductGrid3 from "./ProductGrid3";
import Spinner from "../UI/Spinner";
import FilterSelect from "../UI/FilterSelect";

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
	const [selectedTags, setSelectedTags] = useState({});
  
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

	/**
	 * Handle filter selection.
	 * @param {Array} selected 
	 * @returns 
	 */
	const filterTagHandler = selected => {
		const selectedTags = {};
		for(const tag of selected) {
			selectedTags[tag.value] = true;
		}
		setSelectedTags(selectedTags)
	};

	// Get available filter options
	const filterOptions = [];
	const uniqueTags = new Set();
	if(productData) {
		productData[category].forEach(product => {
			uniqueTags.add(product.tags[0]);
		});
		uniqueTags.forEach(tag => {
			filterOptions.push({
				label: tag,
				value: tag
			})
		});
	}

  return (
    <div className={styles.container}>
      {/* Banner section */}
			<div className={styles.banner}>
				<img src={productsBanner} alt=""></img>
				<h1 className={styles["banner-text"]}>
					{category}
				</h1>
			</div>

			{/* Toolbar section */}
			<div className={styles.toolbar}>
				<FilterSelect 
					options={filterOptions}
					changeSelection={filterTagHandler}
					selected={Object.keys(selectedTags).map(tag => {return {label: tag, value: tag}})}
				/>
			</div>

      {/* Tabs section */}
      {loading && <Spinner style={{height: "70vh"}}/>}
      {!loading && !error && productData && <TabsContainer
        onChangeTab={changeTabHandler}
				components={{
					lounge: {
						title: "Lounge",
						component: <ProductGrid1
              products={
								Object.keys(selectedTags).length
									? productData['lounge'].filter(product => selectedTags[product.tags[0]])
									: productData['lounge']
							}
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />
					},
					bedroom: {
						title: "Bedroom",
						component: <ProductGrid2 
							products={
								Object.keys(selectedTags).length
									? productData['bedroom'].filter(product => selectedTags[product.tags[0]])
									: productData['bedroom']
							}
              onExpandCard={expandCardHandler} 
              expandCard={expandCard} 
              expandCardID={expandCardID} 
            />
					},
					dining: {
						title: "Dining",
						component: <ProductGrid3 
							products={
								Object.keys(selectedTags).length
									? productData['dining'].filter(product => selectedTags[product.tags[0]])
									: productData['dining']
							}
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