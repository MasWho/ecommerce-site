// Style imports
import styles from './CartItem.module.css';

/**
 * Component for a single product that has been added to the cart.
 * @param {Number} price 
 * @param {String} title 
 * @param {Number} amount 
 * @param {String} img 
 * @param {Function} onAdd 
 * @param {Function} onRemove 
 * @returns 
 */
const CartItem = ({price, title, amount, img, onAdd, onRemove}) => {
  const displayPrice = `ZAR ${price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <img src={img} alt="" />
      {/* Summary section */}
      <div>
        <h3>{title}</h3>
        <div className={styles.summary}>
          <span className={styles.price}>{displayPrice}</span>
        </div>
      </div>
      {/* Add or Remove section */}
      <div className={styles.actions}>
        <button onClick={onRemove}>−</button>
        <div className={styles.amount}><span>{amount}</span></div>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;