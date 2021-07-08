import styles from './ProductDetail.module.css';
import useProducts from '../../hooks/use-products';

const ProductDetail = ({category, id}) => {

  const {loading, error, productData} = useProducts('product');

  const product = productData && productData[category].filter(product => product.id === id)[0];

  return (
    <div className={styles.main}>
      {/* Product details */}
      <div className={styles['details-container']}>
        <div className={styles['details-inner-container']}>
          <h2>{`${category} | ${product && product.title}`}</h2>
          <div className={styles['product-detail']}>
            <img src={product && product.img} alt=""/>
            <div style={{width: "40%", height: 0, paddingTop: "30%", border: "1px dashed black"}} />
          </div>
        </div>
      </div>
      {/* Other related products */}
      <div className={styles['other-products-container']}>

      </div>
    </div>
  );
};

export default ProductDetail;