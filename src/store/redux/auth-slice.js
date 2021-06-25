// Global imports
import { createSlice } from "@reduxjs/toolkit";

// Redux store slice for authentication related states and actions
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        uid: null,
        expirationTime: null,
        initialLogoutTimer: null,
        username: null,
    },
    reducers: {
        /**
         * Set state for when the user logs in.
         * @param {Object} state 
         * @param {Object} action 
         */
        setAuth(state, action) {
            state.token = action.payload.token || state.token;
            state.isLoggedIn = !!action.payload.token || state.isLoggedIn;
            state.expirationTime = action.payload.expirationTime || state.expirationTime;
            state.initialLogoutTimer = action.payload.initialLogoutTimer || state.initialLogoutTimer;
            state.uid = action.payload.uid || state.uid;
            state.username = action.payload.username || state.username;
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
            state.uid = null;
            state.username = null;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;