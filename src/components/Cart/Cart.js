// Global imports
import { useContext } from "react";

// Style imports
import styles from './Cart.module.css';

// Component imports
import CartItem from './CartItem';
import Modal from "../UI/Modal";

// Store imports
import CartContext from "../../store/context/cart-context";


/**
 * Cart component for displaying all products added to the cart by the user.
 * @returns 
 */
const Cart = () => {
	const cartCtx = useContext(CartContext);

  // Cart items consist of products added by users
  const cartItems = cartCtx.items.map(item => {
    return (
      <CartItem 
        key={item.id}
        title={item.title}
        price={item.price}
        amount={item.amount}
        img={item.img}
        onAdd={cartCtx.addItem.bind(null, {...item, amount: 1})}
        onRemove={cartCtx.removeItem.bind(null, item.id)}
      />
    );
  });

  // Content for the cart modal
  const cartModalContent = (
    <>
      <ul className={styles['cart-items']}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{`ZAR ${cartCtx.totalPrice.toFixed(2)}`}</span>
      </div>
    </>
  );

	return <Modal onClickBackdrop={cartCtx.closeCart}>{cartModalContent}</Modal>;
};

export default Cart;
