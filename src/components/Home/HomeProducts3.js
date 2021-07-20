// Component imports
import ProductCard from "../Products/ProductCard";

// Styles imports
import styles from './Home.module.css';

const HomeProducts = ({products, onExpandCard, expandCard, expandCardID, category}) => {

	const productCards = products.map(product => {
		return <ProductCard 
			topText="New"
			product={product}
			key={`${product.title}-${product.id}`}
			onExpand={onExpandCard.bind(null, product.id)}
			expandCard={expandCard}
			expandCardID={expandCardID}
			category={category}
		/>
	});

	return (
		<div className={styles.products}>
			{productCards}
		</div>
	);
};

export default HomeProducts;
