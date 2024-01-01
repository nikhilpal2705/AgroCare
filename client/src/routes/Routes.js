import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';

/**
 * Renders Application routes depending on Logged or Anonymous users
 * @component AppRoutes
 */
const AppRoutes = () => {
  const isAuthenticated = false;
  const isAdmin = false;
  return isAuthenticated ? (isAdmin ? <AdminRoutes /> : <PrivateRoutes />) : <PublicRoutes />;
};

export default AppRoutes;
