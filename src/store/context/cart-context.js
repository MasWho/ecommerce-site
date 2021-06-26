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
  totalAmount: 0,
  cartIsOpen: false,
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
    
    return {
      items: updatedItems,
      totalAmount: updatedItems.length
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


  const removeItemHandler = () => {};


  const resetCartHandler = () => {};


  // Cart context values to be passed down to children
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    cartIsOpen: cartState.cartIsOpen,
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