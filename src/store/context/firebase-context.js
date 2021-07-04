/**
 * Global context for firebase related states.
 */

// Global imports
import { createContext } from "react";
import firebase from "firebase/app";
import "firebase/storage";

// Firebase context
const FirebaseContext = createContext({
  storageRef: null
})

// Initializing firebase project for this app
firebase.initializeApp({
	apiKey: "AIzaSyAVWLRWQ30C96j4Vh5onNn3tfEdzAV1tWM",
	authDomain: "ecommerce-site-a5046.firebaseapp.com",
	projectId: "ecommerce-site-a5046",
	storageBucket: "ecommerce-site-a5046.appspot.com",
	messagingSenderId: "446707045560",
	appId: "1:446707045560:web:c536469a6aa6ee3c47104d",
	measurementId: "G-9D933GJLRD"
});

export const FirebaseContextProvider = ({children}) => {
  const firebaseContext = {
    storageRef: firebase.storage().ref('product-imgs/')
  };

  return (
    <FirebaseContext.Provider value={firebaseContext}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;