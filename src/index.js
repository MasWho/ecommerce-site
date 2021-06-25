// Global imports
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";

// Component imports
import "./index.css";
import App from "./App";

// Store imports
import store from './store/redux/index';
import {CartContextProvider} from './store/context/cart-context';

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

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<CartContextProvider>
				<App />
			</CartContextProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
