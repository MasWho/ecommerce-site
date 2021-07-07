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
	const [sortFiled, setSortField] = useState("increase");
  
  const {loading, error, productData} = useProducts('product');

  const changeTabHandler = (tabID) => {
		setSelectedTags({});
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

	/**
	 * Set how to sort the data
	 * @param {String} type 
	 */
	const sortPriceHandler = (type) => {
		setSortField(type);
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

	// Toolbar for manipulating data on the products page
	const Toolbar = (
		<div className={styles.toolbar}>
			{/* Filter selection */}
			<FilterSelect 
				options={filterOptions}
				changeSelection={filterTagHandler}
				selected={Object.keys(selectedTags).map(tag => {return {label: tag, value: tag}})}
			/>
			{/* Sort by section */}
			<div className={styles.sort}>
				<span>Sort by:</span>
				<button 
					onClick={sortPriceHandler.bind(null, 'increase')} 
					style={{color: sortFiled==="increase" ? "#DEB200" : ""}}
				>
					Price low to high
				</button>
				<span>|</span>
				<button 
					onClick={sortPriceHandler.bind(null, 'decrease')} 
					style={{color: sortFiled==="decrease" ? "#DEB200" : ""}}
				>
					Price high to low
				</button>
			</div>
		</div>
	);
	
	/**
	 * Compare function for sorting
	 * @param {Number} a 
	 * @param {Number} b 
	 * @returns 
	 */
	const sortFunc = (a, b, field) => {
		if(sortFiled === "increase") {
			return a[field] - b[field];
		} else {
			return b[field] - a[field];
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
				toolbar={Toolbar}
        onChangeTab={changeTabHandler}
				components={{
					lounge: {
						title: "Lounge",
						component: <ProductGrid1
              products={
								Object.keys(selectedTags).length
									? productData['lounge'].filter(product => selectedTags[product.tags[0]]).sort((a, b) => sortFunc(a, b, 'price'))
									: productData['lounge'].sort((a, b) => sortFunc(a, b, 'price'))
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
									? productData['bedroom'].filter(product => selectedTags[product.tags[0]]).sort((a, b) => sortFunc(a, b, 'price'))
									: productData['bedroom'].sort((a, b) => sortFunc(a, b, 'price'))
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
									? productData['dining'].filter(product => selectedTags[product.tags[0]]).sort((a, b) => sortFunc(a, b, 'price'))
									: productData['dining'].sort((a, b) => sortFunc(a, b, 'price'))
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