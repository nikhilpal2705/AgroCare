import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import Cookies from 'js-cookie';

const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const current = Cookies.get('jwtToken')
  ? Object.keys(Cookies.get()).reduce((acc, key) => {
    acc[key] = Cookies.get(key);
    return acc;
  }, {}) : null

const userData = current ? {
  current: current,
  isLoggedIn: true,
  isLoading: false,
  isSuccess: true,
}
  : AUTH_INITIAL_STATE;

const initialState = { auth: userData };

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true, // Enable Redux DevTools
});

export default store;
