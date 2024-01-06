import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/common/PageLoader';
import { useAuthContext } from 'contexts/auth';

const Logout = () => {
    const navigate = useNavigate();
    const { authContextAction } = useAuthContext();
    const { auth } = authContextAction;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const asyncLogout = async () => {
            auth.logout();
            setLoading(false);
            navigate('/login');
        };
        setTimeout(asyncLogout, 500);
    }, [navigate, auth]);

    if (loading) {
        return <PageLoader />;
    }

    return null;
};

export default Logout;
