/**
 * Global context for Cart related states and actions.
 * The states are managed using react useReducer hook.
 */

// Global imports
import { createContext, useReducer } from "react"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// Default states for context
const defaultCartState = {
  items: [],
  totalPrice: 0,
  cartIsOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  reset: () => {}
};


// Cart context
const CartContext = createContext(defaultCartState);


/**
 * Reducer function for cart states.
 * @param {Object} state 
 * @param {Object} action 
 */
const cartReducer = (state, action) => {

  // Action for opening the cart
  if(action.type === "OPEN_CART") {
    return {
      ...state,
      cartIsOpen: true
    };
  }

  // Action for closing the cart
  if(action.type === "CLOSE_CART") {
    return {
      ...state,
      cartIsOpen: false
    };
  }
  
  // Action for adding a item, or multiple items to cart
  if(action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
    let updatedItems;
    // Check to see if item is existing, if it is, then increase the amount for that item
    if(existingItemIndex === -1) {
      const updatedItem = {
        ...action.payload
      };
      updatedItems = state.items.concat(updatedItem);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingItemIndex].amount = updatedItems[existingItemIndex].amount + action.payload.amount;
    }

    const totalPrice = updatedItems
      .map(item => item.amount * item.price)
      .reduce((acc, val) => acc + val);
    
    return {
      ...state,
      items: updatedItems,
      totalPrice: totalPrice
    }
  }

  // Action for removing an item
  if(action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
    
    let updatedItems = [...state.items];
    let totalPrice = state.totalPrice;
    // If the product amount is reduced to 0, then remove it from the cart
    if(updatedItems[existingItemIndex].amount === 1) {
      updatedItems = updatedItems.filter(item => item.id !== action.payload);
      totalPrice = 0;
    } else {
      updatedItems[existingItemIndex].amount = updatedItems[existingItemIndex].amount - 1;
      totalPrice = updatedItems
        .map(item => item.amount * item.price)
        .reduce((acc, val) => acc + val);
    }

    return {
      ...state,
      items: updatedItems,
      totalPrice: totalPrice
    }
  }

  return defaultCartState;
};


/**
 * Component for providing CartContext to all child components wrapped within.
 * Provides states and handlers linked to the reducer function here. 
 * @param {Object} children 
 * @returns 
 */
export const CartContextProvider = ({children}) => {

  // Redux user login state
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const history = useHistory();

  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  /**
   * Open the cart using the OPEN_CART reducer action.
   */
  const openCartHandler = () => {
    cartDispatch({type: "OPEN_CART"});
  };

  /**
   * Close the cart using the CLOSE_CART reducer action.
   */
  const closeCartHandler = () => {
    cartDispatch({type: "CLOSE_CART"});
  };

  /**
   * Add item to cart. If the user is not logged in, redirect to signup page.
   * @param {Object} item
   * @returns 
   */
  const addItemHandler = (item) => {
    if(!isLoggedIn) {
      history.push('/auth-signup');
      return;
    }

    cartDispatch({
      type: 'ADD_ITEM', 
      payload: item 
    })
  };

  /**
   * Remove an item from cart based on product id.
   * @param {String} id 
   */
  const removeItemHandler = (id) => {
    cartDispatch({
      type: 'REMOVE_ITEM', 
      payload: id
    })
  };


  const resetCartHandler = () => {};


  // Cart context values to be passed down to children
  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    cartIsOpen: cartState.cartIsOpen,
    openCart: openCartHandler,
    closeCart: closeCartHandler,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    reset: resetCartHandler
  };

  return (
    <CartContext.Provider value={cartContext} >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;