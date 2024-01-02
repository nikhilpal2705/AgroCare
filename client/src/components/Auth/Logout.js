import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../Common/PageLoader';
import { useAuth } from '../../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const asyncLogout = async () => {
            await logout();
            setLoading(false);
            navigate('/login');
        };
        setTimeout(asyncLogout, 500);
    }, [navigate, logout]);

    if (loading) {
        return <PageLoader />;
    }

    return null;
};

export default Logout;
