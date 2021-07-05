// Component imports
import ProductCard from './ProductCard';

// Styles imports
import styles from './Products.module.css';

const ProductGrid = ({products, onExpandCard, expandCard, expandCardID}) => {
  
  const productCards = products.map(product => {
		return <ProductCard 
			topText={product.tags[0]}
			product={product}
			width={'100%'}
			key={`${product.title}-${product.id}`}
			onExpand={onExpandCard.bind(null, product.id)}
			expandCard={expandCard}
			expandCardID={expandCardID}
		/>
	});
  
  return (
		<div className={styles['product-grid']}>
			{productCards}
		</div>
  )
};

export default ProductGrid;