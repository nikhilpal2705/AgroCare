import { useEffect, useLayoutEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/common/PageLoader';
import { useDispatch } from 'react-redux';
import { auth } from '../../redux/auth/actions';
import { crud } from '../../redux/crud/actions';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        dispatch(crud.resetState());
    }, [dispatch]);

    const asyncLogout = useCallback(async () => {
        await dispatch(auth.logout());
        navigate('/login');
    }, [dispatch, navigate]);

    useEffect(() => {
        asyncLogout();
    }, [asyncLogout]);

    return <PageLoader />;
};

export default Logout;
