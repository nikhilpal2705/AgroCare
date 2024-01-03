import { Route, Routes } from 'react-router-dom';
import Layout from 'components/layout/MainLayout/MainLayout';
import NotFound from 'components/common/NotFound';

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
