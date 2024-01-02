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

    const login = (userData) => {
        setIsAuthenticated(true);
        setIsAdmin(Cookies.get('isAdmin') === 'true');
        Cookies.set('jwtToken', userData.jwtToken, { expires: 5 / 24 });
        Cookies.set('isAdmin', userData.isAdmin, { expires: 5 / 24 });
        Cookies.set('email', userData.email, { expires: 5 / 24 });
        Cookies.set('name', userData.name, { expires: 5 / 24 });
        Cookies.set('userId', userData.id, { expires: 5 / 24 });
        Cookies.set('authority', userData.authority, { expires: 5 / 24 });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        Object.keys(Cookies.get()).forEach(function (cookieName) {
            var neededAttributes = {
                // Here you pass the same attributes that were used when the cookie was created
                // and are required when removing the cookie
            };
            Cookies.remove(cookieName, neededAttributes);
        });
    };

    useEffect(() => {
        // Listen for changes to isAuthenticated and remove local storage
        if (!isAuthenticated) {
            Object.keys(Cookies.get()).forEach(function (cookieName) {
                var neededAttributes = {
                    // Here you pass the same attributes that were used when the cookie was created
                    // and are required when removing the cookie
                };
                Cookies.remove(cookieName, neededAttributes);
            }); // Remove token
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
