import PageLoader from 'components/common/PageLoader';
import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
const Profile =  lazy(() => import('components/profile/Profile'));
const Dashboard = lazy(() => import('components/dashboard/Dashboard'));
const CropMonitoring = lazy(() => import('components/crop/CropMonitoring'));
const Layout = lazy(() => import('layout/main/MainLayout'));
const NotFound = lazy(() => import('components/common/NotFound'));
const Logout = lazy(() => import('components/auth/Logout'));
const PestControl = lazy(() => import('components/pest/PestControl'));

function PrivateAppRoutes() {
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
      element: <Profile />,
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
      <Suspense fallback={<PageLoader />}>
        <PrivateAppRoutes />
      </Suspense>
    </Layout>
  );
};

export default PrivateRoutes;
