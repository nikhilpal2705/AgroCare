import { useState } from 'react';
import Register from './components/Register'
import SignIn from './components/SignIn'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { FaBars } from 'react-icons/fa';
import './styles.css';
import Dashboard from './components/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from 'react-router-dom';

// AuthLayout Component
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <main>
        {children}
      </main>
    </div>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);
  const location = useLocation();

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  // Determine if Sidebar should be displayed
  const showSidebar = !['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className={`app ${toggled && showSidebar ? 'toggled' : ''}`}>
      {showSidebar && (
        <Sidebar
          image={image}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
      )}
      <main>
        {showSidebar && (
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
        )}

        <Routes>
          <Route path="/" element={<AuthLayout><Home /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><SignIn /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop-monitoring" element={<Dashboard />} />
          <Route path="/profile" element={<Dashboard />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
