import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/common/PageLoader';
import { useAuthContext } from 'contexts/auth';

const Logout = () => {
    const navigate = useNavigate();
    const { authContextAction } = useAuthContext();
    const { auth } = authContextAction;
    useEffect(() => {
        auth.logout();
        navigate('/login');
    }, [navigate, auth]);

    return <PageLoader />;
};

export default Logout;
