import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('components/Home/Home'));
const Login = lazy(() => import('components/auth/Login'));
const Register = lazy(() => import('components/auth/Register'));
const NotFound = lazy(() => import('components/common/NotFound'));

const PublicRoutes = () => {
  return (

    <div className="auth-layout">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>

  );
};

export default PublicRoutes;
