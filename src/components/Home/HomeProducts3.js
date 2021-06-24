// Component imports
import Card from "../UI/Card";

// Styles imports
import styles from './Home.module.css';

const HomeProducts = ({products, onExpandCard, expandCard, expandCardID}) => {

	const productCards = products.map(product => {
		return <Card 
			topText="New"
			title={product.title}
			price={`ZAR ${product.price}`}
			hasStock={product.hasStock}
			details={product.details}
			img={product.img}
			width={'30%'}
			key={`${product.title}-${product.id}`}
			id={product.id}
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
