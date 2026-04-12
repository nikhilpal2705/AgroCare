import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'layout/main/MainLayout';
import NotFound from 'components/common/NotFound';
import PageLoader from 'components/common/PageLoader';
const Profile = lazy(() => import('components/profile/Profile'));
const Logout = lazy(() => import('components/auth/Logout'));
const About = lazy(() => import('components/About/About'));

const AdminDashboard = lazy(() => import('components/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('components/admin/AdminUsers'));
const AdminList = lazy(() => import('components/admin/AdminAdmins'));

const AdminRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/admins" element={<AdminList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AdminRoutes;
