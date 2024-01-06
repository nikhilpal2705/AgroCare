import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes'
import 'assets/style/app.css';
import { AuthContextProvider } from "contexts/auth";


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
