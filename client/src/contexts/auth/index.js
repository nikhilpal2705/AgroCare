import { createContext, useContext, useReducer } from 'react';
import { authReducer, initialState } from './reducer';
import contextActions from './actions';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }
    const { state, dispatch } = context;
    const authContextAction = contextActions(dispatch);
    return { state, authContextAction };
};

export { AuthContextProvider, useAuthContext };
