import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes'
import 'assets/style/app.css';
import { AuthProvider } from "contexts/auth/AuthContext";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
