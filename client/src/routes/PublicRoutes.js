import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('components/auth/Home'));
const SignIn = lazy(() => import('components/auth/SignIn'));
const Register = lazy(() => import('components/auth/Register'));
const Footer = lazy(() => import('layout/main/Footer'));
const NotFound = lazy(() => import('components/common/NotFound'));

const PublicRoutes = () => {
  return (
    <div className="auth-layout">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div className="text-center text-muted">
        <Footer />
      </div>
    </div>
  );
};

export default PublicRoutes;
