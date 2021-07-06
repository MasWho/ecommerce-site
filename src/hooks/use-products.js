// Custom hooks
import useHttp from "./use-http";

// Global imports
import { useState, useEffect, useCallback, useContext } from "react";

// Store imports
import FirebaseContext from "../store/context/firebase-context";

/**
 * Custom hook for fetching product details from firebase.
 * @param {String} type
 */
const useProducts = (type) => {
  
  const {loading, error, request} = useHttp();
  const [productData, setProductData] = useState(null);
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

  // Get all products from product catalog in db
	useEffect(() => {
		// First check if products data is persisted, if so, then don't make API call
		const products = JSON.parse(localStorage.getItem("products"));
		if(products) {
			const filteredData = {};
			for(const cat in products) {
				filteredData[cat] = [];
				for(const product of products[cat]) {
					if(type === "product") {
						filteredData[cat] = [...products[cat]];
						continue;
					}
					// Filter for new products for the home page only
					if(type === "home" && product.new) {
						filteredData[cat].push(product);
					}
				}
			}
			setProductData(filteredData);
			return;
		}

		request(
			"https://ecommerce-site-a5046-default-rtdb.europe-west1.firebasedatabase.app/products.json",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			},
			async (data) => {
				const filteredData = {};
				for(const cat in data) {
					filteredData[cat] = [];
					for(const product of data[cat]) {
						if(type === "product") {
							filteredData[cat] = [...data[cat]];
							continue;
						}
						// Filter for new products for the home page only
						if(type === "home" && product.new) {
							filteredData[cat].push(product);
						}
					}
				}
				const modifiedData = await getAllProductImages(filteredData);
				// Persist data
				localStorage.setItem("products", JSON.stringify(modifiedData));
				setProductData(modifiedData)
			}
		)

	}, [request, getAllProductImages, type]);

  return {
    loading,
    error,
    productData
  };
};

export default useProducts;