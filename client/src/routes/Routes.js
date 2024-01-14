import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/selectors';

/**
 * Renders Application routes depending on Logged or Anonymous users
 * @component AppRoutes
 */

const AppRoutes = () => {
  const { isLoggedIn, isAdmin } = useSelector(selectAuth);
  return isLoggedIn ? (isAdmin ? <AdminRoutes /> : <PrivateRoutes />) : <PublicRoutes />;
};

export default AppRoutes;