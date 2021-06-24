// Global imports
import { createSlice } from "@reduxjs/toolkit";

// Redux store slice for authentication related states and actions
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        expirationTime: null,
        initialLogoutTimer: null
    },
    reducers: {
        /**
         * Set state for when the user logs in.
         * @param {Object} state 
         * @param {Object} action 
         */
        setAuth(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = !!action.payload.token;
            state.expirationTime = action.payload.expirationTime;
            state.initialLogoutTimer = action.payload.initialLogoutTimer;
        },

        /**
         * Set state for when the user logs out.
         * @param {Object} state 
         */
        clearAuth(state) {
            state.token = null;
            state.isLoggedIn = false;
            state.expirationTime = null;
            state.initialLogoutTimer = null;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;