import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';
import { useAuth } from 'contexts/auth/AuthContext';

/**
 * Renders Application routes depending on Logged or Anonymous users
 * @component AppRoutes
 */

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  return isAuthenticated ? (isAdmin ? <AdminRoutes /> : <PrivateRoutes />) : <PublicRoutes />;
};

export default AppRoutes;