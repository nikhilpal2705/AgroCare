import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Layout from '../components/Layout/MainLayout';
import NotFoundView from '../components/Common/NotFoundView';

const PrivateRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Layout>
  );
};

export default PrivateRoutes;
