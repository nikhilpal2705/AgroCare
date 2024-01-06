import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';
import { useAuthContext } from 'contexts/auth';

/**
 * Renders Application routes depending on Logged or Anonymous users
 * @component AppRoutes
 */

const AppRoutes = () => {
  const { state } = useAuthContext();
  const { isAuthenticated, isAdmin } = state;
  return isAuthenticated ? (isAdmin ? <AdminRoutes /> : <PrivateRoutes />) : <PublicRoutes />;
};

export default AppRoutes;