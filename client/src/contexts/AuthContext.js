import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => !!Cookies.get('jwtToken') // Initial value based on cookies
    );
    const [isAdmin, setIsAdmin] = useState(
        () => Cookies.get('isAdmin') === 'true' // Initial value based on cookies
    );
    const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

    const login = (isAdmin, jwtToken) => {
        setIsAuthenticated(true);
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
        setJwtToken(jwtToken)
        Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 });
        Cookies.set('isAdmin', isAdmin, { expires: 5 / 24 });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        Cookies.remove('jwtToken');
        Cookies.remove('isAdmin');
    };

    useEffect(() => {
        // Listen for changes to isAuthenticated and update local storage
        if (isAuthenticated) {
            Cookies.set('jwtToken', jwtToken, { expires: 5 / 24 }); // Store token
            Cookies.set('isAdmin', isAdmin, { expires: 5 / 24 }); // Store isAdmin flag
        } else {
            Cookies.remove('jwtToken'); // Remove token
            Cookies.remove('isAdmin'); // Remove isAdmin flag
        }
    }, [isAuthenticated, isAdmin, jwtToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
