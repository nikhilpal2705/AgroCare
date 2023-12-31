import { Route, Routes } from 'react-router-dom';
import Home from '../components/Auth/Home'
import SignIn from '../components/Auth/SignIn';
import Register from '../components/Auth/Register';
import Footer from '../components/Layout/Footer';
import NotFoundView from '../components/Common/NotFoundView';

const PublicRoutes = () => {
  return (
    <div className="auth-layout">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>
      <div className="text-center text-muted">
        <Footer />
      </div>
    </div>
  );
};

export default PublicRoutes;
