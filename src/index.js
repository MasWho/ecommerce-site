// Global imports
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Component imports
import "./index.css";
import App from "./App";

// Store imports
import store from './store/redux/index';
import {CartContextProvider} from './store/context/cart-context';
import {FirebaseContextProvider} from './store/context/firebase-context';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<FirebaseContextProvider>
				<CartContextProvider>
					<App/>
				</CartContextProvider>
			</FirebaseContextProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
