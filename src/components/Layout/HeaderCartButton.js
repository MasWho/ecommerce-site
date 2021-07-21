// Global imports
import {useContext, useEffect, useState} from 'react';

// Style imports
import styles from './HeaderCartButton.module.css';

// Component imports
import CartIcon from '../Cart/CartIcon';

// Store imports
import CartContext from '../../store/context/cart-context';

/**
 * Cart button in Navbar for opening the cart modal.
 * @param {Function} onClick
 * @param {String} color
 * @param {String} backgroundColor
 * @returns 
 */
const HeaderCartButton = ({onClick, color, backgroundColor}) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);  // For highlighting items being added to cart
    
    const cartCtx = useContext(CartContext);
    const btnStyles = [styles.button, btnIsHighlighted ? styles.bump : ""];

    // Check number of items in the cart to display
    const numberOfCartItems = cartCtx.items.reduce((acc, item) => {
        return acc + item.amount;
    }, 0);

    const {items} = cartCtx;

    const cartClickHandler = () => {
        cartCtx.openCart();
        onClick();
    }

    // For displaying a little bump in cart when items are added to it
    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnStyles.join(" ")} onClick={cartClickHandler} style={{backgroundColor: backgroundColor}}>
            <span className={styles.icon} style={{backgroundColor: backgroundColor}}>
                <CartIcon color={color}/>
            </span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;