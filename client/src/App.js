import 'assets/style/app.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PageLoader from 'components/common/PageLoader';

const AppRoutes = lazy(() => import('./routes'));


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
