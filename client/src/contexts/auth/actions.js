import * as actionTypes from './types';
import Cookies from 'js-cookie';

const contextActions = (dispatch) => {
    return {
        auth: {
            login: (userData) => {
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: userData,
                });
                Cookies.set('jwtToken', userData.jwtToken, { expires: 5 / 24, secure: true, sameSite: 'strict' });
                Cookies.set('isAdmin', userData.isAdmin, { expires: 5 / 24, secure: true, sameSite: 'strict' });
                Cookies.set('email', userData.email, { expires: 5 / 24, secure: true, sameSite: 'strict' });
                Cookies.set('name', userData.name, { expires: 5 / 24, secure: true, sameSite: 'strict' });
                Cookies.set('userId', userData.userId, { expires: 5 / 24, secure: true, sameSite: 'strict' });
                Cookies.set('authority', userData.authority, { expires: 5 / 24, secure: true, sameSite: 'strict' });
            },
            logout: () => {
                dispatch({
                    type: actionTypes.LOGOUT,
                });
                Object.keys(Cookies.get()).forEach(function (cookieName) {
                    Cookies.remove(cookieName, { secure: true, sameSite: 'strict' });
                });
            }
        }
    };
}
export default contextActions;
