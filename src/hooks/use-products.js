// Custom hooks
import useHttp from "./use-http";

// Global imports
import { useState, useEffect, useCallback } from "react";


/**
 * Custom hook for fetching product details from firebase.
 * @param {String} type
 */
const useProducts = (type) => {
  
  const {loading, error, request} = useHttp();
  const [productData, setProductData] = useState(null);

	const loadData = useCallback(() => {

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
				setProductData(filteredData)
			}
		)
	}, [request, type]);

  // Get all products from product catalog in db
	useEffect(() => {
		loadData();
	}, [loadData]);

  return {
    loading,
    error,
    productData,
		loadData
  };
};

export default useProducts;