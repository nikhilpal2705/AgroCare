import { Route, Routes } from 'react-router-dom';
import Layout from 'layout/main/MainLayout';
import NotFound from 'components/common/NotFound';

const AdminRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound entity={'dashboard'} />} />
      </Routes>
    </Layout>
  );
};

export default AdminRoutes;
