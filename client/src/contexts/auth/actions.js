import * as actionTypes from './types';
import Cookies from 'js-cookie';

const contextActions = (dispatch) => {
    return {
        auth: {
            login: (userData, remember) => {
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: userData,
                });
                let cookieOptions = {
                    expires: remember ? new Date(Date.now() + 5 * 60 * 60 * 1000) : null, // if remember then cookies will valid for 5 hours else it will valid for current session
                    secure: true,
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
            },
            logout: () => {
                dispatch({
                    type: actionTypes.LOGOUT,
                });
                let cookieOptions = {
                    secure: true,
                    sameSite: 'Lax',
                    httpOnly: false,
                    domain: window.location.hostname,
                    path: '/',
                }
                Object.keys(Cookies.get()).forEach(key => {
                    Cookies.remove(key, cookieOptions);
                });
            }
        }
    };
}
export default contextActions;
