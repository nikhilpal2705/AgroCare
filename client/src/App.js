import 'assets/style/app.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from "contexts/auth";
import { Suspense } from 'react';
import PageLoader from 'components/common/PageLoader';

const AppRoutes = lazy(() => import('./routes'));


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
