// Component imports
import Card from "../UI/Card";

// Styles imports
import styles from './Home.module.css';

const HomeProducts = ({products, onExpandCard, expandCard, expandCardID}) => {

	const productCards = products.map(product => {
		return <Card 
			topText="New"
			product={product}
			width={'30%'}
			key={`${product.title}-${product.id}`}
			onExpand={onExpandCard.bind(null, product.id)}
			expandCard={expandCard}
			expandCardID={expandCardID}
		/>
	});

	return (
		<div className={styles.products}>
			{productCards}
		</div>
	);
};

export default HomeProducts;
