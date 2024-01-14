import api from 'api/api';
import * as actionTypes from './types';
import * as authService from 'api/AuthService';
import Cookies from 'js-cookie';

export const auth = {
  resetAction: () => async (dispatch) => {
    dispatch({ type: actionTypes.RESET_ACTION });
  },
  login: ({ loginData }) => async (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });

    try {
      const data = await authService.login({ loginData });

      if (data.success === true) {
        const userData = {
          jwtToken: data.result.jwtToken,
          isAdmin: false,
          name: data.result.user.name,
          email: data.result.user.email,
          userId: data.result.user.id,
          authority: data.result.user.authorities[0]?.authority
        };

        let cookieOptions = {
          expires: loginData.remember ? new Date(Date.now() + 5 * 60 * 60 * 1000) : null,
          secure: process.env.NODE_ENV === 'production', // Adjust based on environment
          sameSite: 'Lax',
          httpOnly: false,
          domain: window.location.hostname,
          path: '/',
        };

        Cookies.set('jwtToken', userData.jwtToken, cookieOptions);

        Object.keys(userData).forEach(key => {
          if (key !== 'jwtToken') {
            Cookies.set(key, userData[key], cookieOptions);
          }
        });

        await api.setHeader({ jwtToken: userData.jwtToken })

        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          payload: userData,
        });
      } else {
        dispatch({ type: actionTypes.REQUEST_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
  },

  register: ({ registerData }) => async (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });

    try {
      const data = await authService.register({ registerData });

      if (data.success === true) {
        dispatch({ type: actionTypes.REGISTER_SUCCESS });
      } else {
        dispatch({ type: actionTypes.REQUEST_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
  },

  logout: () => async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });

    try {
      const data = await authService.logout();

      if (data.success === false) {
        dispatch({
          type: actionTypes.LOGOUT_FAILED,
          payload: data.result,
        });
      } else {
        let cookieOptions = {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          httpOnly: false,
          domain: window.location.hostname,
          path: '/',
        };

        Object.keys(Cookies.get()).forEach(key => {
          Cookies.remove(key, cookieOptions);
        });
      }
    } catch (error) {
      dispatch({ type: actionTypes.LOGOUT_FAILED });
    }
  },

  updateProfile: ({ entity, jsonData }) => async (dispatch) => {
    let data = await api.update({ entity, id: '', jsonData });

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });
      const userData = {
        jwtToken: data.result.jwtToken,
        isAdmin: false,
        name: data.result.user.name,
        email: data.result.user.email,
        userId: data.result.user.id,
        authority: data.result.user.authorities[0]?.authority
      };

      let cookieOptions = {
        secure: process.env.NODE_ENV === 'production', // Adjust based on environment
        sameSite: 'Lax',
        httpOnly: false,
        domain: window.location.hostname,
        path: '/',
      };

      Cookies.set('jwtToken', userData.jwtToken, cookieOptions);

      Object.keys(userData).forEach(key => {
        if (key !== 'jwtToken') {
          Cookies.set(key, userData[key], cookieOptions);
        }
      });
    }
  }
};
