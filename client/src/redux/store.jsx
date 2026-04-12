import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import Cookies from 'js-cookie';
import { Authorities } from 'helper/constant';

const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isAdmin: false,
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
  isAdmin: current.authority === Authorities.ADMIN,
}
  : AUTH_INITIAL_STATE;

const initialState = { auth: userData };

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true, // Enable Redux DevTools
});

export default store;
