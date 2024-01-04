import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => !!Cookies.get('jwtToken')
    );
    const [isAdmin, setIsAdmin] = useState(
        () => Cookies.get('isAdmin') === 'true'
    );

    const login = (userData) => {
        setIsAuthenticated(true);
        setIsAdmin(userData.isAdmin === 'true');
        Cookies.set('jwtToken', userData.jwtToken, { expires: 5 / 24, secure: true, sameSite: 'lax' });
        Cookies.set('isAdmin', userData.isAdmin, { expires: 5 / 24, secure: true, sameSite: 'lax' });
        Cookies.set('email', userData.email, { expires: 5 / 24, secure: true, sameSite: 'lax' });
        Cookies.set('name', userData.name, { expires: 5 / 24, secure: true, sameSite: 'lax' });
        Cookies.set('userId', userData.userId, { expires: 5 / 24, secure: true, sameSite: 'lax' });
        Cookies.set('authority', userData.authority, { expires: 5 / 24, secure: true, sameSite: 'lax' });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        Object.keys(Cookies.get()).forEach(function (cookieName) {
            Cookies.remove(cookieName, { secure: true, sameSite: 'lax' });
        });
    };

    useEffect(() => {
        if (!isAuthenticated) {
            Object.keys(Cookies.get()).forEach(function (cookieName) {
                Cookies.remove(cookieName, { secure: true, sameSite: 'lax' });
            });
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
