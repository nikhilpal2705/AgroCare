import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import CropMonitoring from '../components/CropMonitoring/CropMonitoring';
import Layout from '../components/Layout/MainLayout';
import NotFound from '../components/Common/NotFound';
import Logout from '../components/Auth/Logout';

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
