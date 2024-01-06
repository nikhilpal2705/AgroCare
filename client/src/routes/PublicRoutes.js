import { Route, Routes } from 'react-router-dom';
import Home from 'components/auth/Home'
import SignIn from 'components/auth/SignIn';
import Register from 'components/auth/Register';
import Footer from 'layout/main/Footer';
import NotFound from 'components/common/NotFound';
import "bootstrap/dist/css/bootstrap.min.css";

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
