import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Layout from '../components/Layout/MainLayout';
import NotFound from '../components/Common/NotFound';

const PrivateRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="*" element={<NotFound entity={'dashboard'} />} />
      </Routes>
    </Layout>
  );
};

export default PrivateRoutes;
