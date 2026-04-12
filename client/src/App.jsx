import 'assets/style/app.css';

import { useEffect, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { App as AntdApp, ConfigProvider } from 'antd';
import store from './redux/store';
import PageLoader from 'components/common/PageLoader';
import { setNotificationApi } from 'api/notificationBridge';

const AppRoutes = lazy(() => import('./routes'));

function NotificationBridge() {
  const { notification } = AntdApp.useApp();

  useEffect(() => {
    setNotificationApi(notification);
  }, [notification]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2f9d62',
              colorInfo: '#2f9d62',
            },
          }}
        >
          <AntdApp>
            <NotificationBridge />
            <Suspense fallback={<PageLoader />}>
              <AppRoutes />
            </Suspense>
          </AntdApp>
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
