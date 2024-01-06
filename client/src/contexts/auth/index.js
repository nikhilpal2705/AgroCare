import { createContext, useContext, useReducer, useMemo } from 'react';
import { authReducer, initialState } from './reducer';
import contextActions from './actions';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const value = useMemo(() => ({ state, dispatch })); // Use an object instead of an array
    return (
        <AuthContext.Provider value={value}>
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
