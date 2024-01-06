import * as actionTypes from './types';
import Cookies from 'js-cookie';

export const initialState = {
    isAuthenticated: !!Cookies.get('jwtToken'),
    isAdmin: Cookies.get('isAdmin') === 'true',
};
export const authReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: action.payload.isAdmin === 'true',
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                isAdmin: false,
            };
        default:
            return state;
    }
};
