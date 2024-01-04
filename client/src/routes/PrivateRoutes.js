import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from 'components/pages/dashboard/Dashboard';
import CropMonitoring from 'components/pages/crop/CropMonitoring';
import Layout from 'components/layout/main/MainLayout';
import NotFound from 'components/common/NotFound';
import Logout from 'components/auth/Logout';
import PestControl from 'components/pages/pest/PestControl';
function AppRouter() {
  let element = useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: '/login',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: '/register',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/crop-monitoring',
      element: <CropMonitoring />,
    },
    {
      path: '/pest-control',
      element: <PestControl />,
    },
    {
      path: '/profile',
      element: <Dashboard />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return element;
}

const PrivateRoutes = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default PrivateRoutes;
