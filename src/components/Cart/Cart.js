// Global imports
import { useContext, useState } from "react";

// Style imports
import styles from './Cart.module.css';

// Component imports
import CartItem from './CartItem';
import Modal from "../UI/Modal";
import Checkout from "./Checkout";

// Store imports
import CartContext from "../../store/context/cart-context";


/**
 * Cart component for displaying all products added to the cart by the user.
 * @returns 
 */
const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [submitted, setSubmitted] = useState(false);

	const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cancelOrderHandler = () => {
    setIsCheckout(false);
  };

  const submitOrderHandler = () => {
    setSubmitted(true);
    cartCtx.reset();
    console.log("Submit")
  };

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
    cartCtx.items.length > 0
      ? (
        <>
          <ul className={styles['cart-items']}>{cartItems}</ul>
          <div className={styles.total}>
            <span>Total Price</span>
            <span>{`ZAR ${cartCtx.totalPrice.toFixed(2)}`}</span>
          </div>
        </>
      ) : (
        <div className={styles['no-items']}>
          {!hasItems && "No items added to cart"}
        </div>
      )
  );
  
  // Content for cart actions
  const cartActionContent = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={cartCtx.closeCart}>Close</button>
      {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>
  );
  
  // Content for Checkout page
  const checkOutContent = (
    <Checkout onCancel={cancelOrderHandler} onSubmit={submitOrderHandler} />
  );

  // Success submission content
  const successMessage = (
    <div className={styles.success}>
      <p>Order Successfully Sent!</p>
      <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={cartCtx.closeCart}>Close</button>
      </div>
    </div>
  );

	return (
    <>
      {
        submitted
          ? (
            <Modal onClickBackdrop={cartCtx.closeCart} style={{
              top: '40%',
              height: '20vh',
              width: '30rem',
              left: 'calc(50% - 15rem)'
            }}>
              {submitted && successMessage}
            </Modal>
          ) : (
            <Modal onClickBackdrop={cartCtx.closeCart}>
              {isCheckout ? checkOutContent : cartModalContent}
              {!isCheckout && cartActionContent}
            </Modal>
          )
      }
    </>
  );
};

export default Cart;
