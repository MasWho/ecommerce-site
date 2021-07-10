// Global imports
import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

// Style imports
import styles from './ProductDetail.module.css';

// Component imports
import ProductDetailCard from './ProductDetailCard';
import Spinner from '../UI/Spinner';
import Carousel from '../UI/Carousel';

// Hooks imports
import useProducts from '../../hooks/use-products';

/**
 * Component to render product details as well as related products
 * @param {String} category 
 * @param {String} id 
 * @returns 
 */
const ProductDetail = ({category, id}) => {

  const {loading, error, productData} = useProducts('product');
  // State for carousel paging
  const [page, setPage] = useState(0);
  const [slideLeft, setSlideLeft] = useState(false);
  const [slideRight, setSlideRight] = useState(false);
  const history = useHistory();

  let product, otherProducts, totalPages;
  if(productData) {
    // Get the product for which details should be displayed
    product = productData[category].filter(product => product.id === id)[0];
    // Get all the other products within the same category
    otherProducts = productData[category].filter(product => product.id !== id);
    // // Calculate total number of pages within carousel based on 3 items per page
    totalPages = Math.ceil(productData[category].length / 3);
  }

  const clickCarouselItemHandler = (id) => {
    setPage(0);
    history.push(`/products/${category}/${id}`);
  };

  const clickRightHandler = useCallback(() => {
    let nextPage = page + 1;
    // If page is at end towards the right
    if(nextPage >= totalPages) {
      nextPage = 0;
    }
    setSlideLeft(true);
    // Need timeout to create sliding animation effect in carousel
    setTimeout(() => {
      setPage(nextPage);
      setSlideLeft(false);
    }, 500);
  }, [page, totalPages]);

  const clickLeftHandler = () => {
    let nextPage = page - 1;
    // If page is at end towards the left
    if(nextPage <= 0) {
      nextPage = totalPages - 1;
    }
    setSlideRight(true);
    setTimeout(() => {
      setPage(nextPage);
      setSlideRight(false);
    }, 500);
  };

  useEffect(() => {
    // Interval for sliding carousel
    const interval = setInterval(() => {
      clickRightHandler();
    }, 5000);
    return () => {
      clearInterval(interval)
    };
  }, [clickRightHandler]);

  return (
    <div className={styles.main}>
      {loading && <Spinner style={{height: "70vh"}}/>}
      {!loading && !error && productData && 
        <>
          {/* Product details */}
          <div className={styles['details-container']}>
            <div className={styles['details-inner-container']}>
              <h2><span onClick={() => history.push('/products')}>{category}</span>{` | ${product.title}`}</h2>
              <div className={styles['product-detail']}>
                <img src={product.img} alt=""/>
                <ProductDetailCard product={product} style={{width: "40%"}}/>
              </div>
            </div>
          </div>
          {/* Other related products */}
          <div className={styles['other-products-container']}>
            <h2>Other {category} items</h2>
            {/* Carousel */}
            <Carousel 
              perPage={3}
              currentPage={page}
              items={otherProducts}
              onClickItem={clickCarouselItemHandler}
              onClickRight={clickRightHandler}
              onClickLeft={clickLeftHandler}
              slideLeft={slideLeft}
              slideRight={slideRight}
            />
            <button><Link to="/products">View all</Link><div className={styles.play}/></button>
          </div>
        </>
      }
    </div>
  );
};

export default ProductDetail;