// Global imports
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';

// Styles imports
import styles from './Carousel.module.css';

/**
 * Component to render a single carousel item. The width of each item is dynamically 
 * determined depending on how many items per page of carousel.
 * @param {String} img
 * @param {String} title
 * @param {String} subheading
 * @param {Number} perPage
 * @param {Function} onClickItem
 * @param {Bool} slideLeft
 * @param {Bool} slideRight
 * @returns 
 */
const CarouselItem = ({img, title, subheading, perPage, onClickItem, slideLeft, slideRight}) => {

  const eachItemWidth = (75 / perPage);  // Calculate carousel item width

  // Dynamically apply sliding left or sliding right styles to each carousel item
  let carouselStyles = [styles['item-container']];
  if(slideLeft) {
    carouselStyles.push(styles['slide-left']);
  } else if (slideRight) {
    carouselStyles.push(styles['slide-right']);
  }
  carouselStyles = carouselStyles.join(" ");

  return (
    <div className={carouselStyles} style={{width: `${eachItemWidth}%`}}>
      <img src={img} alt="" />
      <div className={styles['item-inner-container']}>
        <div className={styles['item-text']}>
          <h3>{title}</h3>
          <p>{`ZAR ${subheading}`}</p>
        </div>
        <div className={styles.play} onClick={onClickItem}/>
      </div>
    </div>
  );
};


/**
 * Component to render a dynamically rotating carousel.
 * @param {Number} perPage 
 * @param {Number} currentPage 
 * @param {Number} items 
 * @param {Number} onClickItem 
 * @param {Number} onClickRight 
 * @param {Number} onClickLeft 
 * @param {Number} slideLeft 
 * @param {Number} slideRight 
 * @returns 
 */
const Carousel = ({perPage, currentPage, items, onClickItem, onClickRight, onClickLeft, slideLeft, slideRight}) => {
  
  // Slicing the items input depending on the page of the carousel.
  const itemsToDisplay = items.slice(currentPage * perPage, currentPage * perPage + perPage);
  const carousel = itemsToDisplay.map(item => 
    <CarouselItem 
      img={item.img} 
      title={item.title} 
      subheading={item.price.toFixed(2)} 
      perPage={perPage}
      onClickItem={() => onClickItem(item.id)}
      slideLeft={slideLeft}
      slideRight={slideRight}
    />
  );

  return (
    <div className={styles['container']}>
      <IconContext.Provider value={{size: "2em"}}>
        <BsChevronLeft className={styles.icon} onClick={onClickLeft}/> 
        {carousel}
        <BsChevronRight className={styles.icon} onClick={onClickRight}/>
      </IconContext.Provider>
    </div>
  );
};

export default Carousel;