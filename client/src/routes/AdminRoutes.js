import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/MainLayout';
import NotFound from '../components/Common/NotFound';

const PrivateRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound entity={'dashboard'} />} />
      </Routes>
    </Layout>
  );
};

export default PrivateRoutes;
